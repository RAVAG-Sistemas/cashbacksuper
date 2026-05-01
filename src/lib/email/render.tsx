import { render } from "@react-email/render";

import { CashbackEarnedEmail } from "@/emails/cashback-earned-email";
import { CashbackExpiringEmail } from "@/emails/cashback-expiring-email";
import { CashbackRedeemedEmail } from "@/emails/cashback-redeemed-email";
import { CustomerWelcomeEmail } from "@/emails/customer-welcome-email";
import { MerchantWeeklySummaryEmail } from "@/emails/merchant-weekly-summary-email";
import { MerchantWelcomeEmail } from "@/emails/merchant-welcome-email";
import { PaymentFailedEmail } from "@/emails/payment-failed-email";
import { PointsExpiringDigestEmail } from "@/emails/points-expiring-digest-email";
import { SubscriptionActivatedEmail } from "@/emails/subscription-activated-email";
import { TrialEndingEmail } from "@/emails/trial-ending-email";

export async function renderCashbackEarnedEmail(
  props: Parameters<typeof CashbackEarnedEmail>[0],
) {
  return render(<CashbackEarnedEmail {...props} />);
}

export async function renderCashbackExpiringEmail(
  props: Parameters<typeof CashbackExpiringEmail>[0],
) {
  return render(<CashbackExpiringEmail {...props} />);
}

export async function renderCashbackRedeemedEmail(
  props: Parameters<typeof CashbackRedeemedEmail>[0],
) {
  return render(<CashbackRedeemedEmail {...props} />);
}

export async function renderCustomerWelcomeEmail(
  props: Parameters<typeof CustomerWelcomeEmail>[0],
) {
  return render(<CustomerWelcomeEmail {...props} />);
}

export async function renderMerchantWeeklySummaryEmail(
  props: Parameters<typeof MerchantWeeklySummaryEmail>[0],
) {
  return render(<MerchantWeeklySummaryEmail {...props} />);
}

export async function renderMerchantWelcomeEmail(
  props: Parameters<typeof MerchantWelcomeEmail>[0],
) {
  return render(<MerchantWelcomeEmail {...props} />);
}

export async function renderPaymentFailedEmail(
  props: Parameters<typeof PaymentFailedEmail>[0],
) {
  return render(<PaymentFailedEmail {...props} />);
}

export async function renderPointsExpiringDigestEmail(
  props: Parameters<typeof PointsExpiringDigestEmail>[0],
) {
  return render(<PointsExpiringDigestEmail {...props} />);
}

export async function renderSubscriptionActivatedEmail(
  props: Parameters<typeof SubscriptionActivatedEmail>[0],
) {
  return render(<SubscriptionActivatedEmail {...props} />);
}

export async function renderTrialEndingEmail(
  props: Parameters<typeof TrialEndingEmail>[0],
) {
  return render(<TrialEndingEmail {...props} />);
}
