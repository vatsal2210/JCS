
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Jain Community Services of Canada - Home',
  description: 'Providing voluntary services to Canadian Jains and newcomers since 1985.',
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <div className="relative w-48 h-48 mx-auto mb-8">
          <Image
            src="/assets/JCS.png"
            alt="JCS Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold mb-4">Welcome to Jain Community Services</h1>
        <p className="text-xl text-gray-600">
          Serving the Canadian Jain community since 1985
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To support and strengthen the Jain community in Canada through various
            services and programs.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          <p className="text-gray-600">
            From newcomer support to cultural events, we provide a range of
            services to our community.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <p className="text-gray-600">
            Join our community and participate in various events and volunteer
            opportunities.
          </p>
        </div>
      </section>

      <section className="bg-gray-50 p-8 rounded-lg mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Career Guidance Session</h3>
            <p className="text-gray-600 mb-4">
              Join us for an insightful session on career development and
              mentorship opportunities.
            </p>
            <a href="/events/career-mentorship-event" className="text-blue-600 hover:text-blue-800">
              Learn more →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
