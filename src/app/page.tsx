import { AboutDetails } from './AboutDetails';
import { MenuButton } from './MenuButton';

export default function AboutPage() {
  return (
    <>
      <div className="mx-auto mt-12 flex [max-width:650px] flex-col items-start justify-center gap-6 p-4 text-xl leading-relaxed">
        <p>
          I'm Jerry Gao, a front-end software engineer in New York. I enjoy
          building interactive UIs and the work that goes into maintaining a
          great developer experience.
        </p>
        <div className="-mx-6 flex [width:calc(100%+3rem)] flex-col gap-1 rounded-lg bg-zinc-800 p-6">
          <p className="flex items-center gap-3">
            <span>This site is a collection of code experiments</span>
            <span>
              <MenuButton />
            </span>
          </p>

          <p>
            You can view the{' '}
            <a href="https://github.com/blackwright/mori">source</a>.
          </p>
        </div>
        <p>
          I currently work at{' '}
          <a href="https://www.courierhealth.com">Courier Health</a>, where I
          build UI to improve healthcare outcomes for patient services programs.
        </p>
        <p>
          Previously, I was part of the authoring experience team at EdApp
          (acquired by{' '}
          <a href="https://training.safetyculture.com/edapp-now-sc-training/">
            SafetyCulture
          </a>
          ) and a full-stack developer at{' '}
          <a href="https://www.newtonx.com/">NewtonX</a>.
        </p>
        <p>
          I was a{' '}
          <a href="https://www.coroflot.com/jerry-gao">
            designer and illustrator
          </a>{' '}
          before I learned how to code, having majored in illustration at the
          Massachusetts College of Art and Design.
        </p>
        <p>
          Here are links to my{' '}
          <a href="https://github.com/blackwright">GitHub</a> and{' '}
          <a href="https://www.linkedin.com/in/blackwright/">LinkedIn</a>.
        </p>
      </div>

      <AboutDetails />
    </>
  );
}
