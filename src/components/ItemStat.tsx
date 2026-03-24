import { Box, Icon, Link, Text } from '@chakra-ui/react';
import type { IconType } from 'react-icons';

interface ItemStatProps {
	icon: IconType;
	href: string;
	label: string | number;
	title: string;
}

const ItemStat = ({ icon, href, label, title }: ItemStatProps) => (
	<Box my={1}>
		<Link href={href} target="_blank" _hover={{ color: 'blue.500' }} title={title}>
			<Icon as={icon} boxSize="5" verticalAlign="middle" />
			<Text as="span" verticalAlign="middle" marginLeft={2} fontSize="sm">
				{label}
			</Text>
		</Link>
	</Box>
);

export default ItemStat;
