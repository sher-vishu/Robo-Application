import { extendTheme, HTMLChakraProps, ThemingProps } from '@chakra-ui/react';
import { CardComponent } from './additions/card/card';
import { buttonStyles } from './components/button';
import { inputStyles } from './components/input';
import { progressStyles } from './components/progress';
import { linkStyles } from './components/link';
import { globalStyles } from './styles';

export default extendTheme(
	globalStyles,
	buttonStyles, // button styles
	linkStyles, // link styles
	progressStyles, // progress styles
	inputStyles, // input styles
	CardComponent // card component
);

export interface CustomCardProps extends HTMLChakraProps<'div'>, ThemingProps {}