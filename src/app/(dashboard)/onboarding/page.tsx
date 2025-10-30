'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Sparkles, Package, User, ShoppingCart, Check } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

const steps = [
  { step: 1, title: 'Welcome to ResellerPro!', description: 'Let\'s get your account set up in a few quick steps.', icon: Sparkles },
  { step: 2, title: 'Add Your First Product', description: 'What\'s the first item you want to sell?', icon: Package },
  { step: 3, title: 'Add Your First Customer', description: 'Who is your first lucky customer?', icon: User },
  { step: 4, title: 'Create Your First Order', description: 'Let\'s log your first sale!', icon: ShoppingCart },
  { step: 5, title: 'You\'re All Set!', description: 'You\'re ready to manage your business like a pro.', icon: Check },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep - 1]

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <Progress value={progress} className="mb-4" />
          <p className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</p>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <currentStepData.icon className="h-6 w-6 text-primary" />
            {currentStepData.title}
          </CardTitle>
          <CardDescription>{currentStepData.description}</CardDescription>
        </CardHeader>
        <CardContent className="min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentStep === 1 && <WelcomeStep />}
              {currentStep === 2 && <OnboardingStepContent title="Add Product Form Component" />}
              {currentStep === 3 && <OnboardingStepContent title="Add Customer Form Component" />}
              {currentStep === 4 && <OnboardingStepContent title="Create Order Form Component" />}
              {currentStep === 5 && <CompletionStep />}
            </motion.div>
          </AnimatePresence>
        </CardContent>
        <CardContent className="flex justify-between border-t pt-4">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length}>
            {currentStep === steps.length - 1 ? 'Go to Dashboard' : 'Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function WelcomeStep() {
  return <p className="text-center text-muted-foreground">Click "Continue" to get started!</p>
}

function OnboardingStepContent({ title }: { title: string }) {
  return (
    <div className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">{title} will be rendered here</p>
    </div>
  )
}

function CompletionStep() {
  return (
    <div className="text-center space-y-4">
      <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
        <Check className="h-8 w-8 text-green-500" />
      </div>
      <p className="text-lg font-medium">Setup Complete!</p>
      <p className="text-muted-foreground">You are now ready to explore your new dashboard.</p>
    </div>
  )
}