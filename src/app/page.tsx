
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Image
            src="/assets/JCS.png"
            alt="JCS Logo"
            width={150}
            height={150}
            priority
            className="rounded-full"
          />
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            Jain Community Services of Canada
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Providing voluntary services to Canadian Jains and newcomers since 1985. Offering support in accommodation, job search, healthcare, and more.
          </p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Contact Us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
