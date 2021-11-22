import { useCallback, useEffect, useState } from "react"
import './Bathtub.css'

const MAX_WATER_LEVEL = 5
const FILLING_DURATION = 2000
const TAB_STATUSES = {
  INCREASING: 'increasing',
  DECREASING: 'decreasing',
  STOPPED: 'stopped'
}

const Bathtub = () => {
  const [tubStatus, setTubStatus] = useState(TAB_STATUSES.STOPPED)
  const [waterLevel, setWaterLevel] = useState(0)

  const updateTank = useCallback(() => {
    switch (tubStatus) {
      case TAB_STATUSES.INCREASING:
        if (waterLevel >= MAX_WATER_LEVEL) {
          setTubStatus(TAB_STATUSES.STOPPED)
        } else {
          setWaterLevel(waterLevel + 1)
        }
        break
      case TAB_STATUSES.DECREASING:
        if (waterLevel <= 0) {
          setTubStatus(TAB_STATUSES.STOPPED)
        } else {
          setWaterLevel(waterLevel - 1)
        }
        break
      default:
        break
    }
  }, [
    tubStatus,
    waterLevel,
    setTubStatus,
    setWaterLevel
  ])

  const increaseWaterLevel = useCallback(() => {
    setTubStatus(TAB_STATUSES.INCREASING)
  }, [
    setTubStatus
  ])

  const decreaseWaterLevel = useCallback(() => {
    setTubStatus(TAB_STATUSES.DECREASING)
  }, [
    setTubStatus
  ])

  useEffect(() => {
    const tick = setTimeout(() => {
      updateTank()
    }, FILLING_DURATION)
    return () => clearTimeout(tick)
  }, [
    updateTank
  ])

  return (
    <div className="bathtub-container">
      <div className="bathtub-header">
        <button onClick={increaseWaterLevel}>Increase</button>
        <h2>{waterLevel}</h2>
        <button onClick={decreaseWaterLevel}>Decrease</button>
      </div>
      <div className="bathtub-inner">
        <div className="bathtub-fill" style={{ height: waterLevel * 20 }}></div>
      </div>
    </div>
  )
}

export default Bathtub
