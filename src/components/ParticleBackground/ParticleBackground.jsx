import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useMemo, useState } from 'react'
import { loadSlim } from '@tsparticles/slim'
import { useTheme } from '@/context/themeContext'
import './Particles.css'
const ParticleBackground = props => {
  const [init, setInit] = useState(false)
  const { theme } = useTheme()

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    })
      .then(() => {
        setInit(true)
      })
      .catch(error => {
        console.error('Error initializing particles engine:', error)
      })
  }, [])

  // Options for particles
  const options = useMemo(
    () => ({
      background: {
        color: {
          value: theme === 'dark' ? '#181E24' : '#FFFFFF'
        }
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: 'repulse'
          },
          onHover: {
            enable: true,
            mode: 'grab'
          }
        },
        modes: {
          push: {
            distance: 200,
            duration: 15
          },
          grab: {
            distance: 150
          }
        }
      },
      particles: {
        color: {
          value: theme === 'dark' ? '#FFFFFF' : '#000000'
        },
        links: {
          color: theme === 'dark' ? '#FFFFFF' : '#000000',
          distance: 150,
          enable: true,
          opacity: 0.3,
          width: 1
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce'
          },
          random: true,
          speed: 1,
          straight: false
        },
        number: {
          density: {
            enable: true
          },
          value: 150
        },
        opacity: {
          value: 1.0
        },
        shape: {
          type: 'circle'
        },
        size: {
          value: { min: 1, max: 3 }
        }
      },
      detectRetina: true
    }),
    [theme]
  )

  return <Particles id={props.id} options={options} />
}

export default ParticleBackground
