import 'twin.macro';
import { MenuButton } from './MenuButton';
import { AboutContainer, Callout, CalloutParagraph } from './styled';
import { AboutDetails } from './AboutDetails';

export default function AboutPage() {
  return (
    <>
      <AboutContainer>
        <p>
          I'm Jerry Gao, a front-end software engineer in New York. I enjoy
          building interactive UIs and the work that goes into maintaining a great
          developer experience.
        </p>
        <Callout>
          <CalloutParagraph>
            <span>This site is a collection of code experiments</span>
            <span>
              <MenuButton />
            </span>
          </CalloutParagraph>

          <p>
            You can view the{' '}
            <a href="https://github.com/blackwright/mori">source</a>.
          </p>
        </Callout>
        <p>
          I currently work at{' '}
          <a href="https://www.courierhealth.com">Courier Health</a>, where I
          build UI to improve healthcare outcomes for patient services programs.
        </p>
        <p>
          Previously, I was part of the authoring experience team at EdApp (acquired by <a href="https://training.safetyculture.com/edapp-now-sc-training/">SafetyCulture</a>) and a full-stack developer at{' '}
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
          Here are links to my <a href="https://github.com/blackwright">GitHub</a>{' '}
          and <a href="https://www.linkedin.com/in/blackwright/">LinkedIn</a>.
        </p>
      </AboutContainer>
    
      <AboutDetails />
    </>
  );
}
