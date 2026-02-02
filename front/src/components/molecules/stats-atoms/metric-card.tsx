
export const MetricCard = ({ icon, label, value, description, className = "" }: {
    icon: React.ReactNode,
    label: string,
    value: string,
    description: string,
    className?: string
}) => (
    <div className={`p-4 rounded-xl border border-muted-foreground/5 bg-background/50 hover:bg-background/80 transition-all group shadow-sm ${className}`}>
        <div className="flex items-center gap-2 mb-1">
            {icon}
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tight">{label}</span>
        </div>
        <div className="text-lg font-bold truncate max-w-full capitalize tracking-tight">
            {value}
        </div>
        <div className="text-[10px] text-muted-foreground leading-tight mt-0.5 opacity-80">
            {description}
        </div>
    </div>
);