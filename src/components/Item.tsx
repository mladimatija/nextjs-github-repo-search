import { Container, Separator, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { FiExternalLink, FiEye, FiStar, FiUser } from 'react-icons/fi';
import { TbLicense } from 'react-icons/tb';
import { AiOutlineFork } from 'react-icons/ai';
import type { Repository } from './ItemsContainer';
import ItemStat from './ItemStat';

const Item = ({ data }: { data: Repository }) => (
	<Flex
		padding="6"
		boxShadow="lg"
		bg="bg.panel"
		position="relative"
		transition="transform 0.3s ease"
		_hover={{ transform: 'translateY(-10px)' }}
		data-testid="item"
	>
		<Flex direction="column" justifyContent="space-between" basis="100%" wordBreak="break-word">
			<Container px={0}>
				<Link href={data.html_url} target="_blank" _hover={{ color: 'blue.500' }}>
					<Icon as={FiExternalLink} boxSize="9" verticalAlign="middle" />
					<Text as="span" fontWeight={900} verticalAlign="middle" marginLeft={2}>
						{data.name}
					</Text>
				</Link>
				<Separator my={3} />
				<Text>{data.description}</Text>
			</Container>

			<Container px={0} paddingTop={2}>
				{data.owner && <ItemStat icon={FiUser} href={data.owner.html_url} label={data.owner.login} title="Author" />}

				<ItemStat icon={FiStar} href={data.html_url + '/stargazers'} label={data.stargazers_count} title="Stars" />

				<ItemStat icon={FiEye} href={data.html_url + '/watchers'} label={data.watchers_count} title="Watchers" />

				<ItemStat
					icon={AiOutlineFork}
					href={data.html_url + '/network/members'}
					label={data.forks_count}
					title="Forks"
				/>

				{data.license && (
					<ItemStat icon={TbLicense} href={data.license.url ?? ''} label={data.license.name} title="License" />
				)}
			</Container>
		</Flex>
	</Flex>
);

export default Item;
