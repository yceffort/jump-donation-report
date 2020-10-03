import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Public() {
  const { year } = useParams()

  useEffect(() => {
    console.log(year)
  }, [year])

  return <>여기는 public {year}</>
}
