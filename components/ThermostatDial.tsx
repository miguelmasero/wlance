'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Fan, Power } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { callHomeAssistant } from '@/utils/homeAssistant'

interface ThermostatDialProps {
  initialTemperature?: number
  minTemperature?: number
  maxTemperature?: number
  entity_id?: string
}

export function ThermostatDial({
  initialTemperature = 21,
  minTemperature = 16,
  maxTemperature = 30,
  entity_id = 'climate.living_room'
}: ThermostatDialProps) {
  const [temperature, setTemperature] = useState(initialTemperature)
  const [isOn, setIsOn] = useState(true)
  const [isAuto, setIsAuto] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)

  const radius = 90
  const center = { x: 100, y: 100 }
  const totalAngle = 180
  const startAngle = -180 // Start at 270 degrees

  const calculateTemperatureFromAngle = useCallback((angle: number) => {
    const normalizedAngle = (angle - startAngle + 360) % 360
    if (normalizedAngle > totalAngle) return maxTemperature
    const percentage = normalizedAngle / totalAngle
    return Math.round(minTemperature + percentage * (maxTemperature - minTemperature))
  }, [minTemperature, maxTemperature, startAngle, totalAngle])

  const calculateAngleFromTemperature = useCallback((temp: number) => {
    const percentage = (temp - minTemperature) / (maxTemperature - minTemperature)
    return startAngle + percentage * totalAngle
  }, [minTemperature, maxTemperature, startAngle, totalAngle])

  const calculateDotPosition = useCallback((angle: number) => {
    const radians = (angle * Math.PI) / 180
    return {
      x: center.x + radius * Math.cos(radians),
      y: center.y + radius * Math.sin(radians)
    }
  }, [center, radius])

  const handleInteraction = useCallback((clientX: number, clientY: number) => {
    if (svgRef.current && isOn) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const centerX = svgRect.left + svgRect.width / 2
      const centerY = svgRect.top + svgRect.height / 2
      const angle = Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)
      const newTemperature = calculateTemperatureFromAngle(angle)
      setTemperature(newTemperature)
    }
  }, [isOn, calculateTemperatureFromAngle])

  const handleMouseDown = useCallback((event: React.MouseEvent<SVGCircleElement>) => {
    if (isOn) {
      setIsDragging(true)
      handleInteraction(event.clientX, event.clientY)
      event.preventDefault()
    }
  }, [isOn, handleInteraction])

  const handleTouchStart = useCallback((event: React.TouchEvent<SVGCircleElement>) => {
    if (isOn) {
      setIsDragging(true)
      handleInteraction(event.touches[0].clientX, event.touches[0].clientY)
      event.preventDefault()
    }
  }, [isOn, handleInteraction])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (isDragging) {
      handleInteraction(event.clientX, event.clientY)
    }
  }, [isDragging, handleInteraction])

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (isDragging && event.touches[0]) {
      handleInteraction(event.touches[0].clientX, event.touches[0].clientY)
    }
  }, [isDragging, handleInteraction])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false)
      updateHomeAssistant()
    }
  }, [isDragging])

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp, handleTouchMove])

  const updateHomeAssistant = async () => {
    try {
      await callHomeAssistant(`/services/climate/set_temperature`, 'POST', {
        entity_id: entity_id,
        temperature: temperature
      });
      console.log('Temperature updated successfully');
    } catch (error) {
      console.error('Error updating temperature:', error);
      // Error is logged but not displayed to the user
    }
  };

  const togglePower = async () => {
    const newState = !isOn;
    try {
      await callHomeAssistant(`/services/climate/${newState ? 'turn_on' : 'turn_off'}`, 'POST', {
        entity_id: entity_id
      });
      setIsOn(newState);
      console.log(`Thermostat ${newState ? 'turned on' : 'turned off'} successfully`);
    } catch (error) {
      console.error('Error toggling thermostat:', error);
      // Error is logged but not displayed to the user
    }
  };

  const toggleAuto = async () => {
    const newAutoState = !isAuto;
    try {
      await callHomeAssistant(`/services/climate/set_hvac_mode`, 'POST', {
        entity_id: entity_id,
        hvac_mode: newAutoState ? 'auto' : 'heat'
      });
      setIsAuto(newAutoState);
      console.log(`Auto mode ${newAutoState ? 'enabled' : 'disabled'} successfully`);
    } catch (error) {
      console.error('Error toggling auto mode:', error);
      // Error is logged but not displayed to the user
    }
  };

  const angle = calculateAngleFromTemperature(temperature)
  const dotPosition = calculateDotPosition(angle)

  const arcPath = `
    M ${calculateDotPosition(startAngle).x} ${calculateDotPosition(startAngle).y}
    A ${radius} ${radius} 0 0 1 ${dotPosition.x} ${dotPosition.y}
  `

  return (
    <div className="relative w-full max-w-[300px] mx-auto">
      <div className="w-full pb-[100%] relative">
        <svg
          ref={svgRef}
          viewBox="0 0 200 200"
          className="absolute inset-0 w-full h-full"
        >
          {/* Background circle */}
          <circle
            cx={center.x}
            cy={center.y}
            r={radius}
            fill="none"
            stroke="#333"
            strokeWidth="4"
          />

          {/* Temperature gradient arc */}
          {isOn && (
            <path
              d={arcPath}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          )}

          {/* Draggable dot */}
          {isOn && (
            <circle
              ref={dotRef}
              cx={dotPosition.x}
              cy={dotPosition.y}
              r="8"
              fill="white"
              className="cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Temperature display and controls */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <span className={cn(
          "text-4xl sm:text-6xl font-light transition-opacity",
          isOn ? "opacity-100" : "opacity-30"
        )}>
          {temperature}°C
        </span>
        <Fan className={cn(
          "mt-2 sm:mt-4 h-4 w-4 sm:h-6 sm:w-6 transition-all",
          isOn ? "text-zinc-400" : "text-zinc-700",
          isAuto && isOn && "animate-spin"
        )} />
        <div className="flex gap-2 mt-2 sm:mt-4">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "text-xs sm:text-sm font-medium",
              isAuto 
                ? "bg-zinc-800 text-white" 
                : "bg-transparent text-zinc-400"
            )}
            onClick={toggleAuto}
          >
            Auto
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              isOn 
                ? "bg-zinc-800 text-white" 
                : "bg-transparent text-zinc-400"
            )}
            onClick={togglePower}
          >
            <Power className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

