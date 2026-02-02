import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../ui/chart';
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

const StatsRadial = ({ config, statsData, title }: any) => {
    const total = statsData.reduce((acc: number, curr: any) => {
        return acc + curr.departamento + curr.casa + curr.PH;
    }, 0);
    return (
        <ChartContainer
            config={config}
            className="mx-auto aspect-square w-full"
        >
            <RadialBarChart
                data={statsData}
                endAngle={180}
                innerRadius={80}
                outerRadius={160}
            >
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) - 12}
                                            className="fill-foreground text-2xl font-bold"
                                        >
                                            {total.toLocaleString()}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 2}
                                            className="fill-muted-foreground"
                                        >
                                            {title}
                                        </tspan>
                                    </text>
                                )
                            }
                        }}
                    />
                </PolarRadiusAxis>
                <RadialBar
                    dataKey="departamento"
                    stackId="a"
                    cornerRadius={5}
                    fill="#ddd6fe"
                    className="stroke-transparent stroke-2"
                />
                <RadialBar
                    dataKey="casa"
                    fill="#a78bfa"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                />
                <RadialBar
                    dataKey="PH"
                    fill="#8e6afbff"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                />
            </RadialBarChart>
        </ChartContainer>
    )
}

export default StatsRadial