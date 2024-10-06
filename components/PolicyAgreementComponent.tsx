import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface PolicyAgreementComponentProps {
  agreed: boolean
  setAgreed: (agreed: boolean) => void
}

export default function PolicyAgreementComponent({ agreed, setAgreed }: PolicyAgreementComponentProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="policy"
        checked={agreed}
        onCheckedChange={(checked) => setAgreed(checked as boolean)}
      />
      <Label htmlFor="policy">I agree to the terms and conditions</Label>
    </div>
  )
}