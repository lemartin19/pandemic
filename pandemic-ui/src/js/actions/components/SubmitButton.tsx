import { Button } from '../../components/Button';

export function SubmitButton({ disabled, onClick }: { disabled?: boolean; onClick: () => void }) {
  return (
    <Button disabled={disabled} onClick={onClick}>
      Submit
    </Button>
  );
}
