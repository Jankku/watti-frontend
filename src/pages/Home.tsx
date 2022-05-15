import { Button, Container, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <Container size={'md'}>
      <Button variant="filled" size="md" color="orange" onClick={() => navigate('/consumption')}>
        Consumption
      </Button>
    </Container>
  );
}

export default Home;
