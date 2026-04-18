export function Divider() {
    return (
        <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs">
                <span className="bg-background px-4 text-muted-foreground">or continue with email</span>
            </div>
        </div>
    )
}
