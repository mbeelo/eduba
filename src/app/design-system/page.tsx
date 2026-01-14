'use client';

import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Heading,
  ReadingText,
  BodyText,
  FeedbackText,
  LinkText,
  Spinner,
  LoadingCard,
  ProgressBar,
  Alert,
  Badge,
  AccuracyIndicator,
  StatusIndicator,
  Container,
  Grid,
  Stack,
  Inline,
  Section,
  Separator,
} from '@/components/ui';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-reading-background">
      <Container size="xl" className="py-8">
        <Stack spacing="2xl">
          {/* Header */}
          <Section variant="elevated" padding="lg">
            <Stack spacing="md">
              <Heading level={1}>Eduba Design System</Heading>
              <BodyText variant="muted" size="lg">
                A clean, minimal design system optimized for memory training and reading comprehension.
                Built with accessibility, readability, and mobile-responsiveness in mind.
              </BodyText>
            </Stack>
          </Section>

          {/* Typography Section */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Typography</Heading>

              <Grid cols={2} gap="lg">
                <Card variant="default" padding="lg">
                  <Stack spacing="md">
                    <Heading level={3} variant="card">UI Typography</Heading>
                    <Heading level={4}>Headings (Sans-serif)</Heading>
                    <Heading level={5}>Medium heading</Heading>
                    <Heading level={6}>Small heading</Heading>
                    <BodyText>Body text for UI elements and descriptions.</BodyText>
                    <BodyText variant="muted" size="sm">
                      Muted text for secondary information.
                    </BodyText>
                  </Stack>
                </Card>

                <Card variant="reading" padding="lg">
                  <Stack spacing="md">
                    <Heading level={3} variant="card">Reading Typography</Heading>
                    <ReadingText variant="passage" size="base">
                      This is reading text optimized for passages and memorization.
                      It uses a serif font with carefully tuned line height, letter spacing,
                      and optimal line length for comprehension. The typography is designed
                      to reduce cognitive load while studying.
                    </ReadingText>
                    <ReadingText variant="annotation" size="sm">
                      This is annotation text for notes and secondary content.
                    </ReadingText>
                  </Stack>
                </Card>
              </Grid>
            </Stack>
          </Section>

          {/* Memory Training Feedback */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Memory Training Feedback</Heading>

              <Card variant="reading" padding="lg">
                <Stack spacing="md">
                  <Heading level={3} variant="card">Accuracy Feedback</Heading>
                  <ReadingText variant="passage" size="base">
                    In this example passage, we demonstrate how{' '}
                    <FeedbackText status="correct">correct words</FeedbackText>{' '}
                    are highlighted in green, while{' '}
                    <FeedbackText status="incorrect">incorrect words</FeedbackText>{' '}
                    are shown in red. <FeedbackText status="pending">Pending words</FeedbackText>{' '}
                    have a neutral appearance until validated.
                  </ReadingText>

                  <Inline spacing="md">
                    <AccuracyIndicator accuracy={18} total={20} showPercentage />
                    <StatusIndicator status="active" label="Practice Mode" />
                  </Inline>
                </Stack>
              </Card>
            </Stack>
          </Section>

          {/* Buttons & Interactive Elements */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Buttons & Interactive Elements</Heading>

              <Grid cols={3} gap="md">
                <Card padding="md">
                  <Stack spacing="sm">
                    <Heading level={4}>Primary Actions</Heading>
                    <Inline spacing="sm" wrap>
                      <Button variant="primary" size="sm">Start Practice</Button>
                      <Button variant="primary" size="md">Begin Memorization</Button>
                      <Button variant="primary" size="lg">Save Progress</Button>
                    </Inline>
                  </Stack>
                </Card>

                <Card padding="md">
                  <Stack spacing="sm">
                    <Heading level={4}>Secondary Actions</Heading>
                    <Inline spacing="sm" wrap>
                      <Button variant="secondary" size="sm">Cancel</Button>
                      <Button variant="outline" size="md">Review</Button>
                      <Button variant="ghost" size="lg">Settings</Button>
                    </Inline>
                  </Stack>
                </Card>

                <Card padding="md">
                  <Stack spacing="sm">
                    <Heading level={4}>Loading States</Heading>
                    <Inline spacing="sm" wrap>
                      <Button variant="primary" loading>Loading...</Button>
                      <Spinner size="md" color="brand" />
                    </Inline>
                  </Stack>
                </Card>
              </Grid>
            </Stack>
          </Section>

          {/* Progress & Status */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Progress & Status Indicators</Heading>

              <Grid cols={2} gap="lg">
                <Card padding="lg">
                  <Stack spacing="md">
                    <Heading level={4}>Progress Tracking</Heading>
                    <ProgressBar
                      value={75}
                      variant="success"
                      showLabel
                      label="Memory Accuracy"
                    />
                    <ProgressBar
                      value={45}
                      variant="default"
                      showLabel
                      label="Study Progress"
                    />
                    <ProgressBar
                      value={20}
                      variant="warning"
                      showLabel
                      label="Time Remaining"
                    />
                  </Stack>
                </Card>

                <Card padding="lg">
                  <Stack spacing="md">
                    <Heading level={4}>Status Badges</Heading>
                    <Inline spacing="sm" wrap>
                      <Badge variant="success">Mastered</Badge>
                      <Badge variant="warning">Reviewing</Badge>
                      <Badge variant="error">Needs Practice</Badge>
                      <Badge variant="info">New</Badge>
                      <Badge variant="outline">Draft</Badge>
                    </Inline>
                  </Stack>
                </Card>
              </Grid>
            </Stack>
          </Section>

          {/* Alerts & Notifications */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Alerts & Notifications</Heading>

              <Stack spacing="md">
                <Alert variant="success">
                  <strong>Well done!</strong> You&apos;ve successfully memorized this passage with 95% accuracy.
                </Alert>
                <Alert variant="warning">
                  <strong>Review needed:</strong> Some sections require additional practice.
                </Alert>
                <Alert variant="error">
                  <strong>Practice incomplete:</strong> Please complete the full passage before saving.
                </Alert>
                <Alert variant="info">
                  <strong>Tip:</strong> Try breaking longer passages into smaller chunks for better retention.
                </Alert>
              </Stack>
            </Stack>
          </Section>

          {/* Cards & Layout */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Cards & Layout Components</Heading>

              <Grid cols={3} gap="md">
                <Card variant="default">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>
                      Standard card for general content and UI elements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BodyText>
                      This card uses standard styling for interface elements.
                    </BodyText>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardFooter>
                </Card>

                <Card variant="reading">
                  <CardHeader>
                    <CardTitle>Reading Card</CardTitle>
                    <CardDescription>
                      Optimized for passages and reading content.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ReadingText>
                      This card is specifically designed for readable content
                      with enhanced typography and spacing.
                    </ReadingText>
                  </CardContent>
                </Card>

                <Card variant="progress">
                  <CardHeader>
                    <CardTitle>Progress Card</CardTitle>
                    <CardDescription>
                      Shows study progress and achievements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Stack spacing="sm">
                      <AccuracyIndicator accuracy={16} total={20} showFraction />
                      <ProgressBar value={80} variant="success" showLabel />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Stack>
          </Section>

          {/* Loading States */}
          <Section variant="default" padding="lg">
            <Stack spacing="lg">
              <Heading level={2} variant="section">Loading States</Heading>

              <Grid cols={2} gap="lg">
                <LoadingCard rows={4} showHeader variant="default" />
                <LoadingCard rows={3} showHeader={false} variant="reading" />
              </Grid>
            </Stack>
          </Section>

          <Separator />

          {/* Footer */}
          <Section variant="subtle" padding="md">
            <Container size="reading">
              <Stack spacing="sm" align="center">
                <BodyText variant="muted" size="sm">
                  Eduba Design System - Built for effective memory training and academic excellence.
                </BodyText>
                <LinkText href="#" variant="muted">
                  View Documentation
                </LinkText>
              </Stack>
            </Container>
          </Section>
        </Stack>
      </Container>
    </div>
  );
}