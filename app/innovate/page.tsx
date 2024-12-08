"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/Spinner";
import {
  TimerIcon,
  AlertCircle,
  TrendingUpIcon,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SparklesText from "@/components/ui/sparkles-text";

// Define types for our data structures
interface ProcessMetric {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  iconColor: string;
}

interface Step {
  title: string;
  description: string;
}

interface InnovationResult {
  metrics: ProcessMetric[];
  processDescription: string;
  companyAnalysis: string;
  steps: Step[];
}

const initialStates = [
  "🔎 Sending request to AI ...",
  "🌐 Processing innovation insights ...",
  "📊 Generating optimization strategy ...",
];

const initialMetrics: ProcessMetric[] = [
  {
    icon: TimerIcon,
    label: "Timeline",
    value: "6-9 Months",
    iconColor: "text-blue-500",
  },
  {
    icon: AlertCircle,
    label: "Risk Level",
    value: "Medium",
    iconColor: "text-yellow-500",
  },
  {
    icon: TrendingUpIcon,
    label: "Optimization Value",
    value: "€750k - €1.2M",
    iconColor: "text-green-500",
  },
];

export default function Innovate() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [processToOptimize, setProcessToOptimize] = useState("");
  const [innovationResult, setInnovationResult] = useState<InnovationResult | null>(null);
  const [states] = useState(initialStates);

  // Simulated AI API call (replace with actual ChatGPT API)
  const fetchInnovationInsights = async (process: string): Promise<InnovationResult> => {
    // Simulating an API call with a delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      metrics: initialMetrics,
      processDescription: `Innovative approach for optimizing the ${process} process. The current method involves manual steps that can be streamlined through advanced AI and automation technologies.`,
      companyAnalysis: `Comprehensive analysis of ${process} reveals multiple opportunities for efficiency improvements and cost reduction.`,
      steps: [
        {
          title: "Process Mapping",
          description: `Detailed mapping of current ${process} workflow to identify bottlenecks.`
        },
        {
          title: "AI Integration",
          description: "Implement AI-driven solutions to automate repetitive tasks."
        },
        {
          title: "Continuous Improvement",
          description: "Establish a feedback loop for ongoing process optimization."
        }
      ]
    };
  };

  const handleSubmit = async (e: React.FormEvent, suggestedProcess?: string) => {
    e.preventDefault();
    const processInput = suggestedProcess || inputValue.trim();
    
    if (processInput) {
      setIsLoading(true);
      setProcessToOptimize(processInput);
      
      try {
        const result = await fetchInnovationInsights(processInput);
        setInnovationResult(result);
        // Clear the input only after successful processing
        setInputValue("");
      } catch (error) {
        console.error("Error fetching innovation insights:", error);
        // Optionally reset loading state if there's an error
        setIsLoading(false);
      } finally {
        setLoadingComplete(true);
      }
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading && !loadingComplete) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex + 1 < states.length) {
            return prevIndex + 1;
          } else {
            return prevIndex;
          }
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isLoading, loadingComplete, states.length]);

  return (
    <div className="flex items-center justify-center m-4">
      {!loadingComplete && !isLoading ? (
        <div>
          <SparklesText
            className="text-4xl font-bold text-center text-stroke mt-40"
            text="What process do you want to innovate?"
          />
          <form onSubmit={handleSubmit} className="w-full h-40 max-w-3xl flex">
            <div className="flex w-full gap-4 items-center">
              <Input
                type="text"
                placeholder="Enter process to optimize..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full"
              />
              <Button
                type="submit"
                variant="outline"
                className="text-muted-foreground"
              >
                Start Innovation Process <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
          <div className="flex flex-wrap justify-center gap-2">
            {["Lead-To-Cash-Process", "Hire-To-Retire-Process", "Customer Retention"].map((process) => (
              <Button 
                key={process} 
                variant="ghost" 
                className="text-muted-foreground"
                onClick={(e) => {
                  handleSubmit(
                    { preventDefault: () => {} } as React.FormEvent, 
                    process
                  );
                }}
              >
                Optimize {process} <ArrowRight className="h-5 w-5" />
              </Button>
            ))}
          </div>
        </div>
      ) : !loadingComplete ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
          <Spinner />
          <div className="text-2xl font-medium text-gray-700 dark:text-gray-200 animate-fade-in">
            {states[currentIndex]}
          </div>
        </div>
      ) : (
        <Card className="max-w-5xl m-4 mb-8">
          <CardHeader>
            <CardTitle>Innovating on {processToOptimize} 💡</CardTitle>
          </CardHeader>
          <CardContent>
            <Card className="mb-4">
              <CardHeader>Innovation Potential</CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
                  {innovationResult?.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <metric.icon className={`w-5 h-5 ${metric.iconColor}`} />
                      <div>
                        <div className="text-xs text-gray-500">
                          {metric.label}
                        </div>
                        <div className="font-semibold text-sm">
                          {metric.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>Process Description</CardHeader>
              <CardContent>
                <CardDescription>
                  {innovationResult?.processDescription}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="mb-4">
              <CardHeader>Company Analysis</CardHeader>
              <CardContent>
                <CardDescription>
                  {innovationResult?.companyAnalysis}
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>Roadmap</CardHeader>
              <CardContent>
                <CardDescription>
                  Strategic steps to optimize and transform the process:
                </CardDescription>
                <div>
                  {innovationResult?.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 mt-4 items-center">
                      <Checkbox />
                      <div className="text-sm">
                        <p>{step.title}</p>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}
    </div>
  );
}