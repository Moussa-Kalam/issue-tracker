import authOptions from '@/app/auth/authOption';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import { cache } from 'react';

interface Props {
  params: { id: string };
}
const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailpage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);

  if (typeof parseInt(id) !== 'number') notFound();

  const issue = await fetchUser(parseInt(id));

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap='5'>
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction='column' gap='4'>
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: `Details of issue ${issue?.id}`,
  };
}

export default IssueDetailpage;
