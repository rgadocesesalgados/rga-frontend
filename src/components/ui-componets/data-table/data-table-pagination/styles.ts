import tw from "tailwind-styled-components";

export const container = tw.div`
flex
items-center
justify-between
px-2
`;

export const content = tw.div`
flex
items-center
space-x-6
lg:space-x-8
`;

export const containerSelectRow = tw.div`
flex
items-center
space-x-2
`;

export const arrowPerPage = tw.div`
text-sm
font-medium
hidden
sm:block
`;
