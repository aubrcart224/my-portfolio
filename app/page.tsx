import { Layout } from "@/app/components/layout"

export default function HomePage() {
  return (
    <Layout>
      <div className="text-center space-y-4 text-gray-400">
        <h1 className="text-4xl font-bold text-gray-400">Aubrey Carter</h1>
        <p className="text-xl text-gray-400">Building things</p>
        <p className="max-w-md mx-auto text-gray-400">
          Someone trying to make the world a better place with technology
        </p>
      </div>
    </Layout>
  )
}

