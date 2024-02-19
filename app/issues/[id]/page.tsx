import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkDown from 'react-markdown';

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

  return (
    <div>
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
    </div>
  );
};

export default IssueDetailpage;
