import {
  Button,
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

const main = {
  backgroundColor: "#f3f4f6",
  fontFamily: "Inter, Arial, sans-serif",
  margin: "0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e9eaec",
  borderRadius: "22px",
  margin: "32px auto",
  maxWidth: "560px",
  overflow: "hidden",
};

const brandBar = {
  backgroundColor: "#ff2d55",
  color: "#ffffff",
  padding: "24px",
};

const content = {
  padding: "28px",
};

const eyebrow = {
  color: "#ff2d55",
  fontSize: "13px",
  fontWeight: "700",
  letterSpacing: "0.02em",
  margin: "0 0 10px",
};

const heading = {
  color: "#1e1e1e",
  fontSize: "28px",
  lineHeight: "1.18",
  margin: "0 0 14px",
};

const text = {
  color: "#6b7280",
  fontSize: "15px",
  lineHeight: "1.65",
  margin: "0 0 16px",
};

const metric = {
  backgroundColor: "#f8f8f9",
  border: "1px solid #e9eaec",
  borderRadius: "18px",
  padding: "18px",
};

const metricLabel = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "0 0 6px",
};

const metricValue = {
  color: "#1e1e1e",
  fontSize: "30px",
  fontWeight: "800",
  margin: "0",
};

const button = {
  backgroundColor: "#ff2d55",
  borderRadius: "999px",
  color: "#ffffff",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "700",
  padding: "13px 22px",
  textDecoration: "none",
};

const footer = {
  color: "#8b9099",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "18px 0 0",
};

const panel = {
  backgroundColor: "#ffffff",
  border: "1px solid #e9eaec",
  borderRadius: "18px",
  padding: "18px",
};

const panelTitle = {
  color: "#1e1e1e",
  fontSize: "16px",
  fontWeight: "700",
  margin: "0 0 8px",
};

const list = {
  color: "#6b7280",
  fontSize: "14px",
  lineHeight: "1.7",
  margin: "0",
  paddingLeft: "18px",
};

export function CashbackEmailShell({
  preview,
  eyebrowText,
  title,
  children,
}: {
  preview: string;
  eyebrowText: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={brandBar}>
            <Text style={{ color: "#ffffff", fontSize: "16px", fontWeight: "800", margin: 0 }}>
              CASHBACK SUPER
            </Text>
          </Section>
          <Section style={content}>
            <Text style={eyebrow}>{eyebrowText}</Text>
            <Heading style={heading}>{title}</Heading>
            {children}
            <Hr style={{ borderColor: "#e9eaec", margin: "26px 0 0" }} />
            <Text style={footer}>
              Esta mensagem foi enviada pelo Cashback Super para apoiar o relacionamento entre loja
              e cliente.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export function EmailPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section style={{ ...panel, marginTop: "14px" }}>
      <Text style={panelTitle}>{title}</Text>
      {children}
    </Section>
  );
}

export function EmailMetricGrid({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
  }>;
}) {
  return (
    <Section style={{ marginTop: "10px" }}>
      {items.map((item, index) => (
        <Section
          key={`${item.label}-${index}`}
          style={{ ...metric, marginTop: index === 0 ? "0" : "12px" }}
        >
          <Text style={metricLabel}>{item.label}</Text>
          <Text style={metricValue}>{item.value}</Text>
        </Section>
      ))}
    </Section>
  );
}

export function EmailBulletList({ items }: { items: string[] }) {
  return (
    <ul style={list}>
      {items.map((item) => (
        <li key={item} style={{ marginBottom: "8px" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function EmailCta({
  href,
  label,
  marginTop = 22,
}: {
  href: string;
  label: string;
  marginTop?: number;
}) {
  return (
    <Button href={href} style={{ ...button, marginTop: `${marginTop}px` }}>
      {label}
    </Button>
  );
}

export const emailStyles = {
  button,
  footer,
  metric,
  metricLabel,
  metricValue,
  panel,
  panelTitle,
  text,
};
