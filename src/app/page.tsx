import 'twin.macro';
import { AboutContainer } from './AboutContainer';

export default function AboutPage() {
  return (
    <AboutContainer>
      <p>
        I'm Jerry Gao, a front-end engineer working at{' '}
        <a href="https://www.courierhealth.com">Courier Health</a>, where I
        build UI to communicate insights used by patient services programs to
        improve patient outcomes.
      </p>
      <p>
        Previously, I was part of the authoring experience team at{' '}
        <a href="https://www.edapp.com/">EdApp</a> and a full-stack developer at{' '}
        <a href="https://www.newtonx.com/">NewtonX</a>.
      </p>
      <p>
        I was a{' '}
        <a href="https://www.coroflot.com/jerry-gao">
          designer and illustrator
        </a>{' '}
        before I learned how to code. I majored in illustration at the
        Massachusetts College of Art and Design.
      </p>
      <p>
        Here's my <a href="https://github.com/blackwright">GitHub</a> and{' '}
        <a href="https://www.linkedin.com/in/blackwright/">LinkedIn</a>.
      </p>
      <p>
        This site is a collection of code experiments. You can view the{' '}
        <a href="https://github.com/blackwright/mori">source</a>.
      </p>
    </AboutContainer>
  );
}
