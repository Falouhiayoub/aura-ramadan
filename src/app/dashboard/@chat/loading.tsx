import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ChatLoading() {
    return (
        <Card className="h-full flex flex-col glass border-emerald/20">
            <CardHeader className="border-b border-border/40">
                <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="flex-1 p-4 space-y-4">
                <div className="flex justify-end">
                    <Skeleton className="h-16 w-3/4 rounded-lg" />
                </div>
                <div className="flex justify-start">
                    <Skeleton className="h-20 w-4/5 rounded-lg" />
                </div>
                <div className="flex justify-end">
                    <Skeleton className="h-12 w-2/3 rounded-lg" />
                </div>
            </CardContent>
        </Card>
    );
}
