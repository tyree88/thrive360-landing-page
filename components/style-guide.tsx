import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import thrive from "@/styles/theme"

export default function StyleGuide() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Thrive360 Style Guide</h1>

      <Section variant="light" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Typography</h2>
        <div className="space-y-4">
          <div>
            <h1>Heading 1</h1>
            <p className="text-sm text-thrive-gray-500">
              text-4xl md:text-5xl lg:text-6xl font-bold text-thrive-purple-900
            </p>
          </div>
          <div>
            <h2>Heading 2</h2>
            <p className="text-sm text-thrive-gray-500">text-3xl md:text-4xl font-bold text-thrive-purple-800</p>
          </div>
          <div>
            <h3>Heading 3</h3>
            <p className="text-sm text-thrive-gray-500">text-2xl md:text-3xl font-semibold text-thrive-purple-800</p>
          </div>
          <div>
            <h4>Heading 4</h4>
            <p className="text-sm text-thrive-gray-500">text-xl md:text-2xl font-semibold text-thrive-purple-700</p>
          </div>
          <div>
            <h5>Heading 5</h5>
            <p className="text-sm text-thrive-gray-500">text-lg md:text-xl font-medium text-thrive-purple-700</p>
          </div>
          <div>
            <h6>Heading 6</h6>
            <p className="text-sm text-thrive-gray-500">text-base md:text-lg font-medium text-thrive-purple-700</p>
          </div>
          <div>
            <p>Regular paragraph text</p>
            <p className="text-sm text-thrive-gray-500">text-base text-thrive-purple-700</p>
          </div>
          <div>
            <a href="#">Link text</a>
            <p className="text-sm text-thrive-gray-500">
              text-thrive-purple-600 hover:text-thrive-purple-700 transition-colors
            </p>
          </div>
        </div>
      </Section>

      <Section variant="default" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Color System</h2>

        <h3 className="text-xl font-semibold mb-2">Primary Colors (Purple)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="flex flex-col">
              <div className={`h-16 rounded-md bg-thrive-purple-${shade}`}></div>
              <p className="text-sm mt-1">thrive-purple-{shade}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Secondary Colors (Teal)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="flex flex-col">
              <div className={`h-16 rounded-md bg-thrive-teal-${shade}`}></div>
              <p className="text-sm mt-1">thrive-teal-{shade}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Neutral Colors (Gray)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div key={shade} className="flex flex-col">
              <div className={`h-16 rounded-md bg-thrive-gray-${shade}`}></div>
              <p className="text-sm mt-1">thrive-gray-{shade}</p>
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold mb-2">Semantic Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <div className="h-16 rounded-md bg-[#10b981]"></div>
            <p className="text-sm mt-1">success: #10b981</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md bg-[#f59e0b]"></div>
            <p className="text-sm mt-1">warning: #f59e0b</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md bg-[#ef4444]"></div>
            <p className="text-sm mt-1">error: #ef4444</p>
          </div>
          <div className="flex flex-col">
            <div className="h-16 rounded-md bg-[#3b82f6]"></div>
            <p className="text-sm mt-1">info: #3b82f6</p>
          </div>
        </div>
      </Section>

      <Section variant="light" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Default Variants</h3>
            <div className="space-y-2">
              <Button variant="default">Primary Button</Button>
              <p className="text-sm text-thrive-gray-500">variant="default"</p>
            </div>
            <div className="space-y-2">
              <Button variant="secondary">Secondary Button</Button>
              <p className="text-sm text-thrive-gray-500">variant="secondary"</p>
            </div>
            <div className="space-y-2">
              <Button variant="outline">Outline Button</Button>
              <p className="text-sm text-thrive-gray-500">variant="outline"</p>
            </div>
            <div className="space-y-2">
              <Button variant="ghost">Ghost Button</Button>
              <p className="text-sm text-thrive-gray-500">variant="ghost"</p>
            </div>
            <div className="space-y-2">
              <Button variant="link">Link Button</Button>
              <p className="text-sm text-thrive-gray-500">variant="link"</p>
            </div>
            <div className="space-y-2">
              <Button variant="gradient">Gradient Button</Button>
              <p className="text-sm text-thrive-gray-500">variant="gradient"</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Sizes</h3>
            <div className="space-y-2">
              <Button size="sm">Small Button</Button>
              <p className="text-sm text-thrive-gray-500">size="sm"</p>
            </div>
            <div className="space-y-2">
              <Button size="default">Default Button</Button>
              <p className="text-sm text-thrive-gray-500">size="default"</p>
            </div>
            <div className="space-y-2">
              <Button size="lg">Large Button</Button>
              <p className="text-sm text-thrive-gray-500">size="lg"</p>
            </div>
            <div className="space-y-2">
              <Button size="xl">Extra Large Button</Button>
              <p className="text-sm text-thrive-gray-500">size="xl"</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Rounded Variants</h3>
            <div className="space-y-2">
              <Button rounded="default">Default Rounded</Button>
              <p className="text-sm text-thrive-gray-500">rounded="default"</p>
            </div>
            <div className="space-y-2">
              <Button rounded="full">Full Rounded</Button>
              <p className="text-sm text-thrive-gray-500">rounded="full"</p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="default" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Default Input</h3>
            <Input placeholder="Default input" />
            <p className="text-sm text-thrive-gray-500">variant="default"</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Filled Input</h3>
            <Input variant="filled" placeholder="Filled input" />
            <p className="text-sm text-thrive-gray-500">variant="filled"</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Dark Input</h3>
            <Input variant="dark" placeholder="Dark input" />
            <p className="text-sm text-thrive-gray-500">variant="dark"</p>
          </div>
        </div>
      </Section>

      <Section variant="light" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Variants</h3>
            <div className="space-y-2">
              <Badge variant="default">Default Badge</Badge>
              <p className="text-sm text-thrive-gray-500">variant="default"</p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary">Secondary Badge</Badge>
              <p className="text-sm text-thrive-gray-500">variant="secondary"</p>
            </div>
            <div className="space-y-2">
              <Badge variant="outline">Outline Badge</Badge>
              <p className="text-sm text-thrive-gray-500">variant="outline"</p>
            </div>
            <div className="space-y-2">
              <Badge variant="tag">Tag Badge</Badge>
              <p className="text-sm text-thrive-gray-500">variant="tag"</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Sizes</h3>
            <div className="space-y-2">
              <Badge size="sm">Small Badge</Badge>
              <p className="text-sm text-thrive-gray-500">size="sm"</p>
            </div>
            <div className="space-y-2">
              <Badge size="default">Default Badge</Badge>
              <p className="text-sm text-thrive-gray-500">size="default"</p>
            </div>
            <div className="space-y-2">
              <Badge size="lg">Large Badge</Badge>
              <p className="text-sm text-thrive-gray-500">size="lg"</p>
            </div>
          </div>
        </div>
      </Section>

      <Section variant="default" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Default Card</h3>
            <Card>
              <h4 className="text-lg font-semibold mb-2">Card Title</h4>
              <p>This is a default card with default padding.</p>
            </Card>
            <p className="text-sm text-thrive-gray-500">variant="default" padding="default"</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Elevated Card</h3>
            <Card variant="elevated">
              <h4 className="text-lg font-semibold mb-2">Elevated Card</h4>
              <p>This card has elevated styling with a stronger shadow.</p>
            </Card>
            <p className="text-sm text-thrive-gray-500">variant="elevated" padding="default"</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Filled Card</h3>
            <Card variant="filled">
              <h4 className="text-lg font-semibold mb-2">Filled Card</h4>
              <p>This card has a light purple background fill.</p>
            </Card>
            <p className="text-sm text-thrive-gray-500">variant="filled" padding="default"</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Gradient Card</h3>
            <Card variant="gradient">
              <h4 className="text-lg font-semibold mb-2">Gradient Card</h4>
              <p>This card has a subtle gradient background.</p>
            </Card>
            <p className="text-sm text-thrive-gray-500">variant="gradient" padding="default"</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Small Padding</h3>
            <Card padding="sm">
              <h4 className="text-lg font-semibold mb-2">Small Padding</h4>
              <p>This card has smaller padding.</p>
            </Card>
            <p className="text-sm text-thrive-gray-500">variant="default" padding="sm"</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Large Padding</h3>
            <Card padding="lg">
              <h4 className="text-lg font-semibold mb-2">Large Padding</h4>
              <p>This card has larger padding.</p>
            </Card>
            <p className="text-sm text-thrive-gray-500">variant="default" padding="lg"</p>
          </div>
        </div>
      </Section>

      <Section variant="light" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Sections</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Default Section</h3>
            <Section variant="default" className="border border-thrive-purple-100 rounded-lg">
              <p>This is a default section with default spacing.</p>
            </Section>
            <p className="text-sm text-thrive-gray-500 mt-2">variant="default" spacing="default"</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Light Section</h3>
            <Section variant="light" className="rounded-lg">
              <p>This is a light section with default spacing.</p>
            </Section>
            <p className="text-sm text-thrive-gray-500 mt-2">variant="light" spacing="default"</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Dark Section</h3>
            <Section variant="dark" className="rounded-lg">
              <p className="text-white">This is a dark section with default spacing.</p>
            </Section>
            <p className="text-sm text-thrive-gray-500 mt-2">variant="dark" spacing="default"</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Gradient Section</h3>
            <Section variant="gradient" className="rounded-lg">
              <p>This is a gradient section with default spacing.</p>
            </Section>
            <p className="text-sm text-thrive-gray-500 mt-2">variant="gradient" spacing="default"</p>
          </div>
        </div>
      </Section>

      <Section variant="default" className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Gradients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(thrive.gradients).map(([name, value]) => (
            <div key={name} className="space-y-2">
              <div className="h-16 rounded-lg" style={{ background: value }}></div>
              <p className="text-sm">
                {name}: {value}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section variant="light">
        <h2 className="text-2xl font-bold mb-4">Shadows</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(thrive.shadows).map(([name, value]) => (
            <div key={name} className="space-y-2">
              <div className="h-24 rounded-lg bg-white" style={{ boxShadow: value }}></div>
              <p className="text-sm">{name}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
