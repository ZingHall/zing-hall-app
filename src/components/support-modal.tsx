import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Heart, Shield, Wallet } from "lucide-react";
import type { Creator } from "@/lib/types";
import { useCreatorStore } from "@/lib/store";

interface SupportModalProps {
  creator: Creator;
  isOpen: boolean;
  onClose: () => void;
}

const suggestedAmounts = [5, 10, 25, 50, 100];

export function SupportModal({ creator, isOpen, onClose }: SupportModalProps) {
  const [amount, setAmount] = useState<number>(10);
  const [message, setMessage] = useState("");
  const [donorName, setDonorName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { addDonation, updateCreatorFunding } = useCreatorStore();

  const handleSupport = async () => {
    if (amount <= 0) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing based on method
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const donation = {
        id: Date.now().toString(),
        creatorId: creator.id,
        amount,
        message: message || undefined,
        donorName: donorName || undefined,
        paymentMethod,
        createdAt: new Date(),
      };

      addDonation(donation);
      updateCreatorFunding(creator.id, amount);

      setIsProcessing(false);
      setShowPaymentForm(false);
      onClose();

      // Reset form
      setAmount(10);
      setMessage("");
      setDonorName("");
      setPaymentMethod("card");
    } catch (error) {
      setIsProcessing(false);
      // Handle error
    }
  };

  const processingFee = Math.max(0.3, amount * 0.029);
  const totalAmount = amount + processingFee;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Heart className="h-5 w-5 mr-2 text-primary" />
            Support {creator.name}
          </DialogTitle>
        </DialogHeader>

        {!showPaymentForm ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <div className="flex flex-wrap gap-2 mt-2 mb-3">
                {suggestedAmounts.map((suggestedAmount) => (
                  <Button
                    key={suggestedAmount}
                    variant={amount === suggestedAmount ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAmount(suggestedAmount)}
                  >
                    ${suggestedAmount}
                  </Button>
                ))}
              </div>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                placeholder="Enter custom amount"
              />
            </div>

            <div>
              <Label htmlFor="donorName">Your Name (Optional)</Label>
              <Input
                id="donorName"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="Leave blank to donate anonymously"
              />
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Leave a message of support..."
                rows={3}
              />
            </div>

            <div>
              <Label>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="mt-2"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-4 w-4" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Wallet className="h-4 w-4" />
                  <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                    PayPal
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Your contribution</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Processing fee</span>
                <span>${processingFee.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowPaymentForm(true)}
                disabled={amount <= 0}
                className="flex-1"
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        ) : (
          <PaymentForm
            amount={totalAmount}
            paymentMethod={paymentMethod}
            onBack={() => setShowPaymentForm(false)}
            onSubmit={handleSupport}
            isProcessing={isProcessing}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function PaymentForm({
  amount,
  paymentMethod,
  onBack,
  onSubmit,
  isProcessing,
}: {
  amount: number;
  paymentMethod: string;
  onBack: () => void;
  onSubmit: () => void;
  isProcessing: boolean;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      {paymentMethod === "card" ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardName">Cardholder Name</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div>
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                maxLength={5}
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            You will be redirected to PayPal to complete your payment
          </p>
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex justify-between font-medium">
          <span>Total Amount</span>
          <span>${amount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing}
          className="flex-1 bg-transparent"
        >
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isProcessing} className="flex-1">
          {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
}
