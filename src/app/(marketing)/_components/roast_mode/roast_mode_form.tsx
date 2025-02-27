'use client';

import { useState } from 'react';
import { ChevronUpIcon, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { fetchGithubUserData } from '@/actions/getGithubInfo';
import { GithubUserData } from '@/types/github';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

enum VerificationStatus {
  VERIFIED = 'Verified',
  UNVERIFIED = 'Unverified',
  CHECKING = 'Checking...',
}

export const RoastModeForm = () => {
  const [gitUsername, setGitUsername] = useState<string>('');
  const [githubInfo, setGithubInfo] = useState<GithubUserData | null>(null);
  const [responseData, setResponseData] = useState<string | null>(null);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isGithubUserValid, setIsGithubUserValid] =
    useState<VerificationStatus>(VerificationStatus.UNVERIFIED);
  const [isBulletMoved, setIsBulletMoved] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const verifyGithubUser = async () => {
    if (gitUsername.length === 0) {
      setIsGithubUserValid(VerificationStatus.UNVERIFIED);
      setIsBulletMoved(false);
      setIsDisabled(true);
      return;
    }
    setIsLoading(true);
    setIsGithubUserValid(VerificationStatus.CHECKING);

    try {
      const response: GithubUserData = await fetchGithubUserData(gitUsername);
      console.log('Git fetch Response: ', response);

      if (!response.user || response.status.code !== 200) {
        setIsGithubUserValid(VerificationStatus.UNVERIFIED);
        setIsDisabled(true);
        setIsBulletMoved(false);
        return;
      }

      if (response.status.code === 200) {
        setIsGithubUserValid(VerificationStatus.VERIFIED);
        setIsDisabled(false);
        setIsBulletMoved(true);
        setGithubInfo(response);
      }
    } catch (error) {
      setIsGithubUserValid(VerificationStatus.UNVERIFIED);
      setIsDisabled(true);
      setIsBulletMoved(false);
      console.log('Error in Verifying Github User: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGitUsername(value);
    if (value.length === 0) {
      setIsBulletMoved(false);
      setIsGithubUserValid(VerificationStatus.UNVERIFIED);
      setIsDisabled(true);
    }
  };
  const handleSubmitData = async () => {
    const payload = {
      repos: githubInfo?.repos,
      name: githubInfo?.user?.name ?? '',
      username: gitUsername,
      bio: githubInfo?.user?.bio ?? '',
      gitLink: githubInfo?.user?.html_url,
      avatar: githubInfo?.user?.avatar_url,
    };

    setIsLoading(true);
    try {
      const response = await axios.post('/api/roast/', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        console.log('Error in Submitting Data: ', response.statusText);
        console.log(response);
        return;
      }

      const data = response.data;
      setResponseData(data.message);
    } catch (error) {
      console.log('Error in Submitting Data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="bio_generator"
      className="max-w-2xl mx-auto p-6 space-y-8 w-[90vw]"
    >
      <div className="space-y-4" id="github_username">
        <div className="flex items-start space-x-3">
          <div
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white transition-all duration-300',
              {
                'bg-green-600':
                  isGithubUserValid === VerificationStatus.VERIFIED,
                'bg-black': isGithubUserValid !== VerificationStatus.VERIFIED,
                'translate-y-10': isBulletMoved,
              }
            )}
          >
            {isGithubUserValid === VerificationStatus.VERIFIED ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <ChevronUpIcon className="w-5 h-5" />
            )}
          </div>
          <div className="flex-grow space-y-2">
            <label className="block text-md font-medium">
              Drop in your Github Username{' '}
              <span
                className={cn('transition-all ease-in-out duration-100', {
                  'text-green-600':
                    isGithubUserValid === VerificationStatus.VERIFIED,
                  'text-yellow-600':
                    isGithubUserValid === VerificationStatus.CHECKING,
                  'text-red-600':
                    isGithubUserValid === VerificationStatus.UNVERIFIED,
                })}
              >
                {isGithubUserValid}
              </span>
              .
            </label>
            <div className="relative">
              <input
                type="text"
                value={gitUsername}
                onKeyDown={(e) => e.key === 'Enter' && verifyGithubUser()}
                onChange={handleUsernameChange}
                onBlur={verifyGithubUser}
                placeholder="e.g. psantosh16"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                disabled={isLoading}
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        id="submit_button"
        onClick={handleSubmitData}
        disabled={isDisabled || isLoading}
        className={cn(
          'w-full rounded-lg py-4 px-6 font-medium transition-colors',
          isDisabled || isLoading
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-black text-white hover:bg-gray-900'
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Checking...
          </span>
        ) : (
          <span
            className={cn('flex items-center justify-center', {
              'opacity-50': isDisabled,
            })}
          >
            Get ready for roast →
          </span>
        )}
      </button>

      {responseData && (
        <div className="bg-gray-100 p-6 rounded-lg" id="generated_bio_response">
          <h2 className="text-xl font-semibold">Roasted Resume 🥜</h2>
          <div className="flex items-center space-x-4 my-3">
            <Image
              src={githubInfo?.user?.avatar_url ?? '/images/troll.jpg'}
              alt="Roast Resume User Pic"
              width={100}
              height={100}
              className="rounded-full border border-black size-28"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {githubInfo?.user?.name ?? 'No Name'}
              </h2>
              <p className="text-sm text-gray-500">
                {githubInfo?.user?.bio ?? 'No Bio'}
              </p>
              <a
                href={githubInfo?.user?.html_url ?? '#'}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {githubInfo?.user?.login ?? 'No Link'}
              </a>
            </div>
          </div>
          <ReactMarkdown>{responseData}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};
