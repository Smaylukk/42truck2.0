import React, { FC, useEffect, useState } from 'react'
import Box from '@mui/material/Container'
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { CarStatus, ICarDocument } from '../utils/interfaces'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Typography from '@mui/material/Typography'

interface PieData {
  name: string
  value: number
}
export const ChartCars: FC<{ cars: ICarDocument[] }> = ({ cars }) => {
  const [chartData, setChartData] = useState<PieData[]>([])
  const COLORS = [
    'rgb(174,179,178)',
    'rgba(167,40,51)',
    'rgb(54,175,230)',
    'rgb(237,191,1)',
    'rgba(8,171,41,0.85)',
  ]
  useEffect(() => {
    const m = new Map()
    for (const car of cars) {
      if (m.has(car.status)) {
        m.set(car.status, m.get(car.status) + 1)
      } else {
        m.set(car.status, 1)
      }
    }
    const dataset: PieData[] = []
    dataset.push({ name: CarStatus.find, value: m.get(CarStatus.find) ?? 0 })
    dataset.push({ name: CarStatus.buy, value: m.get(CarStatus.buy) ?? 0 })
    dataset.push({
      name: CarStatus.transport,
      value: m.get(CarStatus.transport) ?? 0,
    })
    dataset.push({
      name: CarStatus.repair,
      value: m.get(CarStatus.repair) ?? 0,
    })
    dataset.push({ name: CarStatus.done, value: m.get(CarStatus.done) ?? 0 })

    setChartData(dataset)
  }, [cars])
  return (
    <Box sx={{ py: 2 }} maxWidth='lg'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Діаграма</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ py: 2, height: 350, display: 'flex', justifyContent: 'center' }} maxWidth='lg'>
            <ResponsiveContainer>
              <PieChart width={730} height={300}>
                <Pie
                  data={chartData}
                  color='#000000'
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={120}
                  fill='#8884d8'
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  payload={chartData.map((item, index) => ({
                    id: item.name,
                    type: 'square',
                    value: `${item.name} (${item.value})`,
                    color: COLORS[index % COLORS.length],
                  }))}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
