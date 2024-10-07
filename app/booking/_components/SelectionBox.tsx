import { Card, CardContent } from "@/components/ui/card"

interface SelectionBoxProps {
  title: string;
  value: string;
  onClick: () => void;
}

export function SelectionBox({ title, value, onClick }: SelectionBoxProps) {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-lg font-semibold">{value}</p>
      </CardContent>
    </Card>
  )
}