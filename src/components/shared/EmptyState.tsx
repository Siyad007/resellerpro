import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon: React.ElementType
  title: string
  description: string
  actionText: string
  actionHref: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  actionHref,
}: EmptyStateProps) {
  return (
    <div className="text-center flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg bg-muted/50">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      <Button asChild>
        <Link href={actionHref}>
          <Plus className="mr-2 h-4 w-4" />
          {actionText}
        </Link>
      </Button>
    </div>
  )
}