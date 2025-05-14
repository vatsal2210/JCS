
import Image from 'next/image'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Jain Community Services of Canada',
  description: 'Providing voluntary services to Canadian Jains and newcomers since 1985.',
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <section id="home" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-2/3">
              <h1 className="text-4xl font-bold mb-4">Welcome to Jain Community Services of Canada</h1>
              <p className="text-xl text-gray-600 mb-4">Empowering the Canadian Jain community and newcomers since 1985</p>
              <p className="text-lg mb-3">"Seva is our religion" - સેવા પરમો ધર્મ છે</p>
              <p className="mb-3">Partnered with the Jain Society of Toronto, we ensure all donations received go directly to support our community efforts.</p>
              <p className="mb-3">Our journey began in 1976, leading to the establishment of JCS in 1985. We are dedicated to providing comprehensive support to Jains across Canada.</p>
              <p>Explore our services to see how we can assist you in settling, finding employment, accessing healthcare, and more.</p>
            </div>
            <div className="md:w-1/3 text-center">
              <Image
                src="/assets/JCS256x256.jpg"
                alt="Community Service"
                width={256}
                height={256}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our Services and Supports</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Accommodations and Settling New Immigrants"
              description="We assist new immigrants in finding housing and adapting to life in Canada, ensuring a smooth transition."
            />
            <ServiceCard
              title="Job Support"
              description="Our team provides assistance with job search, resume building, and interview preparation to help you find employment."
            />
            <ServiceCard
              title="Hospital Visits and Food Delivery"
              description="We visit and deliver food to those admitted to hospitals, ensuring they have the support they need during recovery."
            />
            <ServiceCard
              title="Financial Support"
              description="Providing financial assistance to students and families in need to help them overcome financial challenges."
            />
            <ServiceCard
              title="Mental Health Support"
              description="Access to mental health professionals and specialists for individuals and families to ensure their well-being."
            />
            <ServiceCard
              title="Shantipath Services"
              description="Offering Shantipath and cremation services as per Jain Vidhi, providing support during difficult times."
            />
          </div>
        </div>
      </section>

      <section id="events" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold mb-4">Career Guidance Session</h3>
            <p className="text-gray-600 mb-4">
              Join us for an insightful session on career development and mentorship opportunities.
              This event will feature experienced professionals sharing their knowledge and expertise.
            </p>
            <Link 
              href="/events/career-mentorship-event"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-3 text-blue-700">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
