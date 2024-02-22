import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkDown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import delay from 'delay';
import Link from 'next/link';

interface Props {
  params: { id: string };
}

const IssueDetailpage = async ({ params: { id } }: Props) => {
  if (typeof parseInt(id) !== 'number') notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!issue) notFound();

  await delay(2000);

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap={'3'} my='2'>
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card>
          <ReactMarkDown className='prose mt-4'>
            {issue.description}
          </ReactMarkDown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon />
          <Link href={`/issues/${issue.id}/edit`}>Edit issues</Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailpage;
