"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Palette, Save, Undo } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
  label: string
}

function ColorPickerItem({ color, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded-full border" style={{ backgroundColor: color }} />
          <Input type="text" value={color} onChange={(e) => onChange(e.target.value)} className="h-8 w-20" />
        </div>
      </div>
      <div className="flex gap-2">
        {["#000000", "#ffffff", "#3b82f6", "#10b981", "#ef4444", "#f59e0b"].map((presetColor) => (
          <button
            key={presetColor}
            type="button"
            className={cn("h-6 w-6 rounded-full border", color === presetColor && "ring-2 ring-primary ring-offset-2")}
            style={{ backgroundColor: presetColor }}
            onClick={() => onChange(presetColor)}
          />
        ))}
      </div>
    </div>
  )
}

interface FontPickerProps {
  font: string
  onChange: (font: string) => void
  label: string
}

function FontPicker({ font, onChange, label }: FontPickerProps) {
  const fonts = [
    { value: "inter", label: "Inter" },
    { value: "roboto", label: "Roboto" },
    { value: "montserrat", label: "Montserrat" },
    { value: "playfair-display", label: "Playfair Display" },
    { value: "open-sans", label: "Open Sans" },
    { value: "lato", label: "Lato" },
  ]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Select value={font} onValueChange={onChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select font" />
          </SelectTrigger>
          <SelectContent>
            {fonts.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

interface TemplateCustomizerProps {
  portfolioId: string
  initialSettings?: CustomizationSettings
}

export interface CustomizationSettings {
  colors: {
    primary: string
    background: string
    text: string
    accent: string
  }
  typography: {
    headingFont: string
    bodyFont: string
    fontSize: number
    lineHeight: number
  }
  layout: {
    spacing: number
    borderRadius: number
    enableAnimations: boolean
    darkMode: boolean
  }
}

const defaultSettings: CustomizationSettings = {
  colors: {
    primary: "#3b82f6",
    background: "#ffffff",
    text: "#000000",
    accent: "#10b981",
  },
  typography: {
    headingFont: "inter",
    bodyFont: "inter",
    fontSize: 16,
    lineHeight: 1.5,
  },
  layout: {
    spacing: 16,
    borderRadius: 8,
    enableAnimations: true,
    darkMode: false,
  },
}

export default function TemplateCustomizer({ portfolioId, initialSettings }: TemplateCustomizerProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [settings, setSettings] = useState<CustomizationSettings>(initialSettings || defaultSettings)
  const [isLoading, setIsLoading] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(initialSettings || defaultSettings))
  }, [settings, initialSettings])

  const handleColorChange = (colorKey: keyof CustomizationSettings["colors"], value: string) => {
    setSettings((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value,
      },
    }))
  }

  const handleTypographyChange = (key: keyof CustomizationSettings["typography"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [key]: value,
      },
    }))
  }

  const handleLayoutChange = (key: keyof CustomizationSettings["layout"], value: any) => {
    setSettings((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [key]: value,
      },
    }))
  }

  const handleReset = () => {
    setSettings(initialSettings || defaultSettings)
    toast({
      title: "Settings reset",
      description: "Customization settings have been reset to their original values.",
    })
  }

  const handleSave = async () => {
    setIsLoading(true)

    try {
      // In a real implementation, this would save the settings to the database
      // For this example, we'll simulate a successful save
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Settings saved",
        description: "Your customization settings have been saved successfully.",
      })

      setHasChanges(false)
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save customization settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          <CardTitle>Template Customizer</CardTitle>
        </div>
        <CardDescription>Customize the appearance of your portfolio template</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 pt-4">
            <ColorPickerItem
              color={settings.colors.primary}
              onChange={(value) => handleColorChange("primary", value)}
              label="Primary Color"
            />
            <ColorPickerItem
              color={settings.colors.background}
              onChange={(value) => handleColorChange("background", value)}
              label="Background Color"
            />
            <ColorPickerItem
              color={settings.colors.text}
              onChange={(value) => handleColorChange("text", value)}
              label="Text Color"
            />
            <ColorPickerItem
              color={settings.colors.accent}
              onChange={(value) => handleColorChange("accent", value)}
              label="Accent Color"
            />
          </TabsContent>

          <TabsContent value="typography" className="space-y-4 pt-4">
            <FontPicker
              font={settings.typography.headingFont}
              onChange={(value) => handleTypographyChange("headingFont", value)}
              label="Heading Font"
            />
            <FontPicker
              font={settings.typography.bodyFont}
              onChange={(value) => handleTypographyChange("bodyFont", value)}
              label="Body Font"
            />
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Font Size ({settings.typography.fontSize}px)</Label>
              </div>
              <Slider
                value={[settings.typography.fontSize]}
                min={12}
                max={24}
                step={1}
                onValueChange={(value) => handleTypographyChange("fontSize", value[0])}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Line Height ({settings.typography.lineHeight})</Label>
              </div>
              <Slider
                value={[settings.typography.lineHeight * 10]}
                min={10}
                max={20}
                step={1}
                onValueChange={(value) => handleTypographyChange("lineHeight", value[0] / 10)}
              />
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Spacing ({settings.layout.spacing}px)</Label>
              </div>
              <Slider
                value={[settings.layout.spacing]}
                min={8}
                max={32}
                step={4}
                onValueChange={(value) => handleLayoutChange("spacing", value[0])}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Border Radius ({settings.layout.borderRadius}px)</Label>
              </div>
              <Slider
                value={[settings.layout.borderRadius]}
                min={0}
                max={20}
                step={2}
                onValueChange={(value) => handleLayoutChange("borderRadius", value[0])}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-animations">Enable Animations</Label>
              <Switch
                id="enable-animations"
                checked={settings.layout.enableAnimations}
                onCheckedChange={(value) => handleLayoutChange("enableAnimations", value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={settings.layout.darkMode}
                onCheckedChange={(value) => handleLayoutChange("darkMode", value)}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleReset} disabled={isLoading}>
          <Undo className="mr-2 h-4 w-4" />
          Reset
        </Button>
        <Button onClick={handleSave} disabled={isLoading || !hasChanges}>
          {isLoading ? (
            <>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
