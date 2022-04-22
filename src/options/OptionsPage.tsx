import React from 'react';
import { AuthorizationSection } from './AuthorizationSection';
import { ConnectPodSection } from './connect-pod/ConnectPodSection';
import { HelpSection } from './HelpSection';

interface Props {
  extensionUrl: string;
}

export const OptionsPage = ({ extensionUrl }: Props) => {
  return (
    <main className="container text-lg mx-auto p-8">
      <h1 className="text-xl font-medium my-8">Setup WebClip</h1>
      <section>
        <h2 className="text-lg font-medium my-8">1) Get a Solid Pod</h2>
        <p className="my-4">
          For information on how to create your own pod, please visit{' '}
          <a
            className="text-blue-600 hover:underline"
            href="https://solidproject.org/users/get-a-pod"
          >
            the Solid Project
          </a>{' '}
          or just create a pod on{' '}
          <a
            className="text-blue-600 hover:underline"
            href="https://solidcommunity.net/register"
          >
            solidcommunity.net
          </a>
        </p>
      </section>
      <ConnectPodSection />
      <AuthorizationSection extensionUrl={extensionUrl}></AuthorizationSection>
      <HelpSection></HelpSection>
    </main>
  );
};
