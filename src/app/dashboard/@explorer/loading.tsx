import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ExplorerLoading() {
    return (
        <Card className="h-full flex flex-col glass border-lantern-gold/20">
            <CardHeader className="border-b border-border/40">
                <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="flex-1 p-4 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full rounded-lg" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                </div>
            </CardContent>
        </Card>
    );
}
