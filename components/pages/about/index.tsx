import * as React from 'react';
import styled from 'styled-components';
import { AppContext } from 'components/layout/AppContext';
import { Box, Typography, Link } from 'components/shared';

export const About: React.FC = () => {
  const { toggleNavOpen } = React.useContext(AppContext);

  return (
    <Box
      p={4}
      pt={12}
      pb={6}
      width="100%"
      maxWidth="800px"
      mx="auto"
      overflowY="auto"
    >
      <Paragraph mb={6}>
        I'm Jerry Gao, a front-end engineer working at{' '}
        <Link href="https://www.courierhealth.com">Courier Health</Link>, where
        I build UI to communicate insights used by patient services programs to
        improve patient outcomes.
      </Paragraph>
      <Paragraph mb={6}>
        Previously, I was part of the authoring experience team at{' '}
        <Link href="https://www.edapp.com/">EdApp</Link> and a full-stack
        developer at <Link href="https://www.newtonx.com/">NewtonX</Link>.
      </Paragraph>
      <Paragraph mb={6}>
        I was a{' '}
        <Link href="https://www.coroflot.com/jerry-gao">
          designer and illustrator
        </Link>{' '}
        before I learned how to code. I majored in illustration at the
        Massachusetts College of Art and Design.
      </Paragraph>
      <Paragraph mb={6}>
        Here's my <Link href="https://github.com/blackwright">GitHub</Link> and{' '}
        <Link href="https://www.linkedin.com/in/blackwright/">LinkedIn</Link>.
      </Paragraph>
      <Paragraph>
        This site is a collection of{' '}
        <Link onClick={() => toggleNavOpen(true)}>code experiments</Link>. You
        can view the{' '}
        <Link href="https://github.com/blackwright/mori">source</Link>.
      </Paragraph>
    </Box>
  );
};

const Paragraph = styled(Typography).attrs({
  fontSize: '1.5rem',
  lineHeight: '2.25rem'
})``;
