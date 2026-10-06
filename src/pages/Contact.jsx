import { useMemo, useState } from "react";
import { Button, Eyebrow, Reveal, Section, usePageMeta } from "../components/ui";

const participantTypes = ["Child", "Youth", "Adult", "Parent/Guardian", "Other"];

const initialForm = {
  firstName: "",
  lastName: "",
  preferredName: "",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  province: "AB",
  postalCode: "",
  participantType: "",
  participantOther: "",
  guardianName: "",
  guardianRelationship: "",
  guardianPhone: "",
  guardianEmail: "",
  participantFullName: "",
  guardianSignName: "",
  electronicSignature: "",
  agreeRead: false,
  agreeNonRefundable: false,
  agreeAccurate: false,
  agreeTerms: false,
  agreeComplete: false,
};

function isUnderEighteen(dateOfBirth) {
  if (!dateOfBirth) return false;
  const birth = new Date(`${dateOfBirth}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const month = today.getMonth() - birth.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age < 18;
}

function makeRegistrationNumber() {
  const year = new Date().getFullYear();
  const stamp = Date.now().toString().slice(-6);
  return `IQM-${year}-${stamp}`;
}

function Field({ id, label, required, children, hint }) {
  return (
    <label className="block" htmlFor={id}>
      <span className="text-micro tracking-[0.18em] uppercase opacity-70">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      <div className="mt-2">{children}</div>
      {hint ? <span className="mt-2 block text-sm opacity-55">{hint}</span> : null}
    </label>
  );
}

function TextInput({ id, value, onChange, type = "text", required, autoComplete, placeholder }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      required={required}
      autoComplete={autoComplete}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      className="field-input"
    />
  );
}

function CheckItem({ id, checked, onChange, children }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 border border-border bg-paper px-4 py-4">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="field-check mt-1"
      />
      <span className="text-sm leading-relaxed opacity-85">{children}</span>
    </label>
  );
}

export function ContactPage() {
  usePageMeta("Contact | ICONIQMode Leadership and Modeling Centre Society");

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState([]);
  const [submitted, setSubmitted] = useState(null);

  const needsGuardian = useMemo(() => {
    return form.participantType === "Child" || form.participantType === "Youth" || isUnderEighteen(form.dateOfBirth);
  }, [form.dateOfBirth, form.participantType]);

  const setValue = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const validate = () => {
    const next = [];
    const required = [
      ["firstName", "First name"],
      ["lastName", "Last name"],
      ["dateOfBirth", "Date of birth"],
      ["phone", "Phone number"],
      ["email", "Email address"],
      ["address", "Home address"],
      ["city", "City"],
      ["province", "Province"],
      ["postalCode", "Postal code"],
      ["participantType", "Participant type"],
      ["participantFullName", "Participant full name"],
      ["electronicSignature", "Electronic signature"],
    ];

    required.forEach(([key, label]) => {
      if (!String(form[key]).trim()) next.push(`${label} is required.`);
    });

    if (form.participantType === "Other" && !form.participantOther.trim()) {
      next.push("Please describe the other participant type.");
    }

    if (needsGuardian) {
      [
        ["guardianName", "Parent/guardian full name"],
        ["guardianRelationship", "Relationship to participant"],
        ["guardianPhone", "Parent/guardian phone number"],
        ["guardianEmail", "Parent/guardian email"],
        ["guardianSignName", "Parent/guardian signature name"],
      ].forEach(([key, label]) => {
        if (!String(form[key]).trim()) next.push(`${label} is required for participants under 18.`);
      });
    }

    if (!form.agreeRead || !form.agreeNonRefundable || !form.agreeAccurate || !form.agreeTerms || !form.agreeComplete) {
      next.push("Please accept every confirmation checkbox before completing registration.");
    }

    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (nextErrors.length) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const registrationNumber = makeRegistrationNumber();
    const signedDate = new Date().toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const typeLabel =
      form.participantType === "Other" ? `Other — ${form.participantOther.trim()}` : form.participantType;

    const body = [
      "ICONIQMode Registration & Participation Agreement",
      "Document No.: IQM-REG-001 · Version 1.0",
      `Registration Number: ${registrationNumber}`,
      `Date: ${signedDate}`,
      "",
      "APPLICANT",
      `Name: ${form.firstName} ${form.lastName}`,
      `Preferred Name: ${form.preferredName || "—"}`,
      `Date of Birth: ${form.dateOfBirth}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Address: ${form.address}, ${form.city}, ${form.province} ${form.postalCode}`,
      `Participant Type: ${typeLabel}`,
      "",
      needsGuardian
        ? [
            "PARENT / GUARDIAN",
            `Name: ${form.guardianName}`,
            `Relationship: ${form.guardianRelationship}`,
            `Phone: ${form.guardianPhone}`,
            `Email: ${form.guardianEmail}`,
            "",
          ].join("\n")
        : "",
      "ELECTRONIC ACCEPTANCE",
      `Participant Full Name: ${form.participantFullName}`,
      `Parent/Guardian Full Name: ${form.guardianSignName || "—"}`,
      `Electronic Signature: ${form.electronicSignature}`,
      "Accepted: Agreement read, non-refundable fee, accurate information, terms, and complete registration.",
      "",
      "STRICTLY NON-REFUNDABLE REGISTRATION accepted.",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:iconiqmodesociety@gmail.com?subject=${encodeURIComponent(
      `IQ-Mode Registration ${registrationNumber}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted({ registrationNumber, signedDate });
  };

  if (submitted) {
    return (
      <>
        <section className="bg-ink px-6 pt-40 pb-20 text-paper md:px-12 md:pb-28">
          <div className="mx-auto w-full max-w-3xl">
            <Eyebrow>Registration received</Eyebrow>
            <h1 className="mt-8 text-title">Thank you for registering with IQ-Mode.</h1>
            <p className="mt-7 max-w-2xl text-paper/70">
              Your registration package is ready to send. If your email app did not open, please email{" "}
              <a className="text-gold underline-offset-4 hover:underline" href="mailto:iconiqmodesociety@gmail.com">
                iconiqmodesociety@gmail.com
              </a>{" "}
              with your registration number.
            </p>
            <div className="mt-12 border border-paper/20 bg-paper/5 p-8">
              <p className="text-micro tracking-[0.28em] text-gold uppercase">Registration number</p>
              <p className="mt-4 font-display text-heading text-gilt">{submitted.registrationNumber}</p>
              <p className="mt-4 text-paper/65">Signed {submitted.signedDate}</p>
              <p className="mt-6 text-sm text-paper/60">
                Remember: the registration fee is strictly non-refundable once payment has been completed.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button to="/">Return home</Button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setSubmitted(null);
                  setForm(initialForm);
                  setErrors([]);
                }}
              >
                Register another person
              </button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="bg-ink px-6 pt-40 pb-20 text-paper md:px-12 md:pb-28">
        <div className="mx-auto w-full max-w-4xl">
          <Eyebrow>Contact & registration</Eyebrow>
          <h1 className="mt-8 text-title">Registration & Participation Agreement</h1>
          <p className="mt-7 max-w-2xl text-paper/70">
            ICONIQMode Leadership and Modeling Centre Society. Use this page to register as a participant, or email{" "}
            <a className="text-gold underline-offset-4 hover:underline" href="mailto:iconiqmodesociety@gmail.com">
              iconiqmodesociety@gmail.com
            </a>
            . Please read every section carefully before accepting.
          </p>
          <p className="mt-6 text-micro tracking-[0.22em] text-gold uppercase">
            Document No. IQM-REG-001 · Version 1.0 · Connect. Speak. Walk. Lead. Inspire.
          </p>
        </div>
      </section>

      <Section>
        {errors.length ? (
          <div className="mb-10 border border-red-700/30 bg-red-50 px-5 py-4 text-sm text-red-900" role="alert">
            <p className="font-semibold tracking-[0.14em] uppercase">Please review</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-16" noValidate>
          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Part 1 — Registration</Eyebrow>
              <h2 className="mt-7 text-title">Applicant information</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Field id="firstName" label="First name" required>
                <TextInput id="firstName" value={form.firstName} onChange={(value) => setValue("firstName", value)} required autoComplete="given-name" />
              </Field>
              <Field id="lastName" label="Last name" required>
                <TextInput id="lastName" value={form.lastName} onChange={(value) => setValue("lastName", value)} required autoComplete="family-name" />
              </Field>
              <Field id="preferredName" label="Preferred name">
                <TextInput id="preferredName" value={form.preferredName} onChange={(value) => setValue("preferredName", value)} autoComplete="nickname" />
              </Field>
              <Field id="dateOfBirth" label="Date of birth" required>
                <TextInput id="dateOfBirth" type="date" value={form.dateOfBirth} onChange={(value) => setValue("dateOfBirth", value)} required autoComplete="bday" />
              </Field>
              <Field id="phone" label="Phone number" required>
                <TextInput id="phone" type="tel" value={form.phone} onChange={(value) => setValue("phone", value)} required autoComplete="tel" />
              </Field>
              <Field id="email" label="Email address" required>
                <TextInput id="email" type="email" value={form.email} onChange={(value) => setValue("email", value)} required autoComplete="email" />
              </Field>
              <div className="md:col-span-2">
                <Field id="address" label="Home address" required>
                  <TextInput id="address" value={form.address} onChange={(value) => setValue("address", value)} required autoComplete="street-address" />
                </Field>
              </div>
              <Field id="city" label="City" required>
                <TextInput id="city" value={form.city} onChange={(value) => setValue("city", value)} required autoComplete="address-level2" />
              </Field>
              <Field id="province" label="Province" required>
                <TextInput id="province" value={form.province} onChange={(value) => setValue("province", value)} required autoComplete="address-level1" />
              </Field>
              <Field id="postalCode" label="Postal code" required>
                <TextInput id="postalCode" value={form.postalCode} onChange={(value) => setValue("postalCode", value)} required autoComplete="postal-code" />
              </Field>
            </div>

            <div className="mt-12">
              <p className="text-micro tracking-[0.18em] uppercase opacity-70">
                Participant type <span className="text-gold">*</span>
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {participantTypes.map((type) => (
                  <label
                    key={type}
                    className={`flex cursor-pointer items-center gap-3 border px-4 py-3 transition-colors ${
                      form.participantType === type ? "border-gold bg-gold/5" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      name="participantType"
                      value={type}
                      checked={form.participantType === type}
                      onChange={() => setValue("participantType", type)}
                      className="field-check"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
              {form.participantType === "Other" ? (
                <div className="mt-4 max-w-md">
                  <Field id="participantOther" label="Please specify" required>
                    <TextInput id="participantOther" value={form.participantOther} onChange={(value) => setValue("participantOther", value)} required />
                  </Field>
                </div>
              ) : null}
            </div>
          </Reveal>

          {needsGuardian ? (
            <Reveal>
              <div className="max-w-3xl">
                <Eyebrow>Parent / Guardian</Eyebrow>
                <h2 className="mt-7 text-title">Required for participants under 18</h2>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <Field id="guardianName" label="Parent/guardian full name" required>
                  <TextInput id="guardianName" value={form.guardianName} onChange={(value) => setValue("guardianName", value)} required />
                </Field>
                <Field id="guardianRelationship" label="Relationship to participant" required>
                  <TextInput id="guardianRelationship" value={form.guardianRelationship} onChange={(value) => setValue("guardianRelationship", value)} required />
                </Field>
                <Field id="guardianPhone" label="Phone number" required>
                  <TextInput id="guardianPhone" type="tel" value={form.guardianPhone} onChange={(value) => setValue("guardianPhone", value)} required />
                </Field>
                <Field id="guardianEmail" label="Email address" required>
                  <TextInput id="guardianEmail" type="email" value={form.guardianEmail} onChange={(value) => setValue("guardianEmail", value)} required />
                </Field>
              </div>
            </Reveal>
          ) : null}

          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Part 2 — IQ-Mode Registration Agreement</Eyebrow>
              <h2 className="mt-7 text-title">Please read before accepting</h2>
              <p className="mt-6 opacity-80">
                By submitting this registration, I acknowledge and agree to the following:
              </p>
            </div>

            <div className="mt-10 space-y-8 border-t border-border">
              <article className="border-b border-border py-8">
                <h3 className="font-display text-heading">1. Registration</h3>
                <p className="mt-4 max-w-3xl opacity-80">
                  I am voluntarily registering with ICONIQMode Leadership and Modeling Centre Society (“IQ-Mode”) and agree
                  to provide accurate and current information. I understand that registration allows IQ-Mode to maintain my
                  participant registration and communicate with me regarding my participation and registered activities.
                </p>
              </article>

              <article className="border-b border-border py-8">
                <h3 className="font-display text-heading">2. Agreement to Follow IQ-Mode Requirements</h3>
                <p className="mt-4 max-w-3xl opacity-80">
                  I agree to respect IQ-Mode&apos;s rules, policies, reasonable instructions, and standards of respectful
                  conduct while participating in IQ-Mode activities. I understand that registration does not guarantee
                  placement, selection, participation, performance opportunities, modeling opportunities, employment,
                  representation, or any specific outcome unless separately confirmed in writing by IQ-Mode.
                </p>
              </article>

              <article className="border-b border-border py-8">
                <h3 className="font-display text-heading text-gold">3. Strictly Non-Refundable Registration</h3>
                <p className="mt-4 max-w-3xl opacity-80">
                  I understand and expressly agree that my registration fee is <strong>STRICTLY NON-REFUNDABLE</strong>.
                </p>
                <p className="mt-4 max-w-3xl opacity-80">
                  Once my registration has been submitted and the registration fee has been paid:
                </p>
                <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 opacity-80">
                  <li>The registration fee cannot be refunded because of a change of mind.</li>
                  <li>The registration fee cannot be refunded because I decide not to participate.</li>
                  <li>The registration fee cannot be transferred to another person.</li>
                  <li>
                    The registration fee cannot be exchanged for another program, event, service, or activity unless
                    IQ-Mode expressly approves otherwise in writing.
                  </li>
                </ul>
                <p className="mt-4 max-w-3xl opacity-80">
                  Failure to attend, cancellation by the participant, or voluntary withdrawal does not create an
                  entitlement to a refund. By checking the acceptance box below, I confirm that I have read, understood,
                  and accepted the STRICTLY NON-REFUNDABLE registration condition before completing my registration and
                  payment.
                </p>
              </article>

              <article className="border-b border-border py-8">
                <h3 className="font-display text-heading">4. Parent / Guardian Authority</h3>
                <p className="mt-4 max-w-3xl opacity-80">
                  If I am registering a participant under 18, this registration confirms that I have the authority to
                  register the participant and agree to the terms of this Registration &amp; Participation Agreement on
                  the participant&apos;s behalf.
                </p>
              </article>

              <article className="py-8">
                <h3 className="font-display text-heading">5. Acceptance of Agreement</h3>
                <p className="mt-4 max-w-3xl opacity-80">
                  By electronically accepting this agreement, I confirm that:
                </p>
                <div className="mt-6 grid gap-3">
                  <CheckItem id="agreeRead" checked={form.agreeRead} onChange={(value) => setValue("agreeRead", value)}>
                    I have read and understood the ICONIQMode Registration &amp; Participation Agreement.
                  </CheckItem>
                  <CheckItem
                    id="agreeNonRefundable"
                    checked={form.agreeNonRefundable}
                    onChange={(value) => setValue("agreeNonRefundable", value)}
                  >
                    I understand and agree that the registration fee is STRICTLY NON-REFUNDABLE.
                  </CheckItem>
                  <CheckItem id="agreeAccurate" checked={form.agreeAccurate} onChange={(value) => setValue("agreeAccurate", value)}>
                    I confirm that the information I provided is accurate.
                  </CheckItem>
                  <CheckItem id="agreeTerms" checked={form.agreeTerms} onChange={(value) => setValue("agreeTerms", value)}>
                    I agree to the terms and conditions of this Registration &amp; Participation Agreement.
                  </CheckItem>
                </div>
              </article>
            </div>
          </Reveal>

          <Reveal>
            <div className="max-w-3xl">
              <Eyebrow>Electronic signature</Eyebrow>
              <h2 className="mt-7 text-title">Sign to complete</h2>
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <Field id="participantFullName" label="Participant full name" required>
                <TextInput
                  id="participantFullName"
                  value={form.participantFullName}
                  onChange={(value) => setValue("participantFullName", value)}
                  required
                />
              </Field>
              <Field
                id="guardianSignName"
                label="Parent/guardian full name"
                required={needsGuardian}
                hint={needsGuardian ? "Required for participants under 18." : "Complete only if registering a minor."}
              >
                <TextInput
                  id="guardianSignName"
                  value={form.guardianSignName}
                  onChange={(value) => setValue("guardianSignName", value)}
                  required={needsGuardian}
                />
              </Field>
              <div className="md:col-span-2">
                <Field id="electronicSignature" label="Electronic signature / full legal name" required>
                  <TextInput
                    id="electronicSignature"
                    value={form.electronicSignature}
                    onChange={(value) => setValue("electronicSignature", value)}
                    required
                    placeholder="Type your full legal name as your electronic signature"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-10 border border-gold/40 bg-gold/5 p-6 md:p-8">
              <CheckItem id="agreeComplete" checked={form.agreeComplete} onChange={(value) => setValue("agreeComplete", value)}>
                <strong>I AGREE &amp; COMPLETE REGISTRATION.</strong> By checking this box, I confirm that I have reviewed
                this agreement and expressly accept its terms, including the STRICTLY NON-REFUNDABLE REGISTRATION
                condition.
              </CheckItem>
              <button type="submit" className="btn mt-8 w-full sm:w-auto">
                I Agree &amp; Complete Registration
              </button>
              <p className="mt-5 max-w-2xl text-sm opacity-65">
                Submitting opens an email to ICONIQMode with your registration details. Your registration number will also
                appear on the next screen.
              </p>
            </div>
          </Reveal>
        </form>
      </Section>
    </>
  );
}
