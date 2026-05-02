import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ParaVoce } from '@/components/ParaVoce'
import { Personalizados } from '@/components/Personalizados'
import { Products } from '@/components/Products'
import { CTA } from '@/components/CTA'
import { About } from '@/components/About'
import { Process } from '@/components/Process'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ParaVoce />
      <Personalizados />
      <Products />
      <CTA />
      <About />
      <Process />
      <Footer />
    </>
  )
}
