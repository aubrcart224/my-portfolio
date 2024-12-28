//import { Layout } from "@/app/layout"
import { FadeText } from "@/app/components/fade-text"


export default function HomePage() {
  return (
      <div className="text-center space-y-4 text-white">
        <h1 className="text-4xl font-bold text-white mb-12">
        <FadeText>Aubrey Carter</FadeText>
        </h1> 
        <p className="text-xl text-white mb-4">
        <FadeText>
          Building things
        </FadeText>
          </p>
        <p className="max-w-md mx-auto text-white mb-12">
        <FadeText>
          Someone trying to make the world a better place with technology 
        </FadeText>
        </p>
      </div>
  )
}

