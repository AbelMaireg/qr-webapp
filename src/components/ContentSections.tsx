"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  QrCode,
  Palette,
  Download,
  Shield,
  Smartphone,
  Globe,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Heart,
  Award,
} from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Enter Your Content",
      description: "Type your text, URL, contact information, or any content you want to encode into a QR code.",
      icon: QrCode,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
    },
    {
      step: 2,
      title: "Customize Design",
      description: "Choose colors, gradients, cell shapes, and upload your logo to match your brand identity.",
      icon: Palette,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400",
    },
    {
      step: 3,
      title: "Generate & Download",
      description: "Click generate to create your QR code and download it in high-quality PNG or JPG format.",
      icon: Download,
      color: "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">How to Create Your QR Code</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Generate professional QR codes in three simple steps. No registration required, completely free to use.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Badge variant="outline" className="text-sm font-semibold">
                      Step {step.step}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturesSection() {
  const features = [
    {
      icon: Palette,
      title: "Custom Colors & Gradients",
      description:
        "Choose from unlimited color combinations and create beautiful gradient effects to match your brand identity.",
      benefits: ["Unlimited color options", "Multiple gradient directions", "Brand consistency"],
    },
    {
      icon: Shield,
      title: "Logo Integration",
      description:
        "Add your company logo to QR codes with automatic error correction optimization for perfect scanning.",
      benefits: ["Professional branding", "Auto error correction", "Perfect logo placement"],
    },
    {
      icon: Download,
      title: "High-Quality Downloads",
      description: "Generate crisp, high-resolution QR codes in PNG or JPG format, perfect for print and digital use.",
      benefits: ["High resolution output", "Multiple formats", "Print-ready quality"],
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Fully responsive design that works perfectly on all devices - desktop, tablet, and mobile.",
      benefits: ["Responsive design", "Touch-friendly interface", "Cross-platform compatibility"],
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "QR codes work with all modern smartphones and QR code readers across different platforms.",
      benefits: ["Universal scanning", "Cross-platform support", "Wide compatibility"],
    },
    {
      icon: Zap,
      title: "Instant Generation",
      description: "Fast, real-time QR code generation with instant preview and immediate download capability.",
      benefits: ["Real-time preview", "Instant generation", "No waiting time"],
    },
  ]

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Powerful Features for Professional QR Codes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our advanced QR code generator offers everything you need to create professional, branded QR codes for
            business, marketing, and personal use.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function UseCasesSection() {
  const useCases = [
    {
      category: "Business & Marketing",
      icon: TrendingUp,
      color: "bg-blue-500",
      cases: [
        "Business cards and contact information",
        "Marketing campaigns and promotions",
        "Product packaging and labels",
        "Event tickets and invitations",
        "Brochures and flyers",
      ],
    },
    {
      category: "Digital & Technology",
      icon: Globe,
      color: "bg-green-500",
      cases: [
        "Website URLs and landing pages",
        "App download links",
        "Social media profiles",
        "WiFi network credentials",
        "Digital portfolios",
      ],
    },
    {
      category: "Personal & Social",
      icon: Users,
      color: "bg-purple-500",
      cases: [
        "Wedding invitations and RSVPs",
        "Personal contact cards",
        "Social media sharing",
        "Photo gallery links",
        "Personal websites",
      ],
    },
    {
      category: "Education & Training",
      icon: Award,
      color: "bg-orange-500",
      cases: [
        "Course materials and resources",
        "Assignment submissions",
        "Educational content links",
        "Student portfolios",
        "Training documentation",
      ],
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Endless Possibilities with QR Codes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From business marketing to personal projects, QR codes offer versatile solutions for connecting physical and
            digital experiences.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="text-center pb-4">
                <div
                  className={`w-16 h-16 ${useCase.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <useCase.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-lg">{useCase.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {useCase.cases.map((case_item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Star className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                      {case_item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function BenefitsSection() {
  const benefits = [
    {
      title: "Completely Free",
      description: "Generate unlimited QR codes without any cost, registration, or hidden fees.",
      icon: Heart,
      stat: "100% Free",
    },
    {
      title: "High Quality Output",
      description: "Professional-grade QR codes with high resolution perfect for print and digital use.",
      icon: Award,
      stat: "HD Quality",
    },
    {
      title: "Fast Generation",
      description: "Create QR codes instantly with real-time preview and immediate download.",
      icon: Zap,
      stat: "< 1 Second",
    },
    {
      title: "Privacy Focused",
      description: "Your data stays private. We don't store your content or track your usage.",
      icon: Shield,
      stat: "100% Private",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Choose Our QR Code Generator?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built with modern technology and user experience in mind, offering the best QR code generation experience
            available online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2">
                  <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                    {benefit.stat}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FAQSection() {
  const faqs = [
    {
      question: "What is a QR code and how does it work?",
      answer:
        "A QR (Quick Response) code is a two-dimensional barcode that can store various types of information like URLs, text, contact details, and more. When scanned with a smartphone camera or QR reader app, it instantly displays or processes the encoded information.",
    },
    {
      question: "Are the QR codes generated here free to use commercially?",
      answer:
        "Yes, absolutely! All QR codes generated with our tool are completely free to use for both personal and commercial purposes. There are no licensing fees, restrictions, or attribution requirements.",
    },
    {
      question: "What's the difference between error correction levels?",
      answer:
        "Error correction levels determine how much damage a QR code can sustain while still being readable. Low (7%) is for clean environments, Medium (15%) for general use, Quartile (25%) for slightly damaged codes, and High (30%) is recommended when adding logos or for harsh conditions.",
    },
    {
      question: "Can I add my company logo to QR codes?",
      answer:
        "Yes! Our generator supports logo embedding with automatic error correction optimization. When you upload a logo, we automatically set the error correction to High level to ensure your QR code remains scannable even with the logo overlay.",
    },
    {
      question: "What file formats are supported for download?",
      answer:
        "You can download your QR codes in high-quality PNG or JPG formats. PNG is recommended for digital use and when you need transparency, while JPG is great for print materials and smaller file sizes.",
    },
    {
      question: "Do QR codes expire or stop working?",
      answer:
        "The QR codes themselves never expire. However, if your QR code contains a URL, the code will stop working if that website goes offline. For static content like text or contact information, the QR code will work indefinitely.",
    },
    {
      question: "How do I ensure my QR code scans properly?",
      answer:
        "Use high error correction levels, ensure good contrast between foreground and background colors, maintain adequate margins around the code, and test your QR code with multiple devices and apps before final use.",
    },
    {
      question: "Is my data stored or tracked when I generate QR codes?",
      answer:
        "We respect your privacy. While we may store generation history for logged-in users (with consent), we don't track or store the actual content of your QR codes. Your data remains private and secure.",
    },
  ]

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to know about QR codes and our generator
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-left flex items-start gap-3">
                  <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{index + 1}</span>
                  </div>
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pl-12">
                <CardDescription className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
