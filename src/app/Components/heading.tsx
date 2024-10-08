import React from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface HeadingProps {
  level: HeadingLevel;
  children: React.ReactNode;
  className?: string; // Optional className prop for custom styling
}


const Heading: React.FC<HeadingProps> = ({level, children, className}) => {

  const HeadingTag = level;

  return(
    <HeadingTag className={className}>
        {children}
    </HeadingTag>
  )

};
export default Heading;