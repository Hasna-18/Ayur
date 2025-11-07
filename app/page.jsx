import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    
    <div className="bg-background">
      <nav className="sticky top-0 z-50 border-b border-emerald-800/40 bg-emerald-900/40 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-400 tracking-wide">
          Ayur 
        </h1>
        </nav>
      <section className="relative overflow-hidden py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge
                variant="outline"
                className="bg-emerald-900/30 border-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium"
              >
                Health made simple
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Connect with Doctor
                <br />{"  "}
                <span className="gradient-title">anytime, anywhere</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-md">
                Book appointments, consult via video , and manage your healthcare
                journey all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-emerald-600 text-white 
                  hover:bg-emerald-700">
                  <Link 
                  href="/onboarding" 
                  className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="border-emerald-700/30 hover:bg-muted/80">
                <Link 
                href="/doctors" 
                className="flex items-center">
                  Find Doctor
                </Link>
              </Button>
              </div>
            </div>
            <div>
              <Image src="/med.jpg" 
              alt="Doctor consultaion"
              width ={500}
              height={500} />
            </div>
          </div>
        </div>
      </section>
      {/* features */}
      <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How it work</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platfom makes healthcare access</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature,index)=>{
              return(
                <Card key={index}>
                  <CardHeader>
                    <div>{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Card content</p>
                  </CardContent>
                  <CardFooter>
                    <p>Card footer</p>
                  </CardFooter>
                </Card>
              );

            })} </div>
        </div>
        </section>

        {/* Subscriptions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-emerald-950/20 boarder-emerald-800">
            <CardContent className="p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div>
                <h2>Ready to tajke contriol of your healthcare</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  JOIN NOW FOR BLAH BLAH BAlah blah bla hblmflknf  fn
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button>
                    <Link href="/signup">Signup now</Link>
                  </Button>
                  <Button>
                    <Link href="/priceplan">View plan</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}