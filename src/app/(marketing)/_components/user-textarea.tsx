'use client';

import { useState } from 'react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronUpIcon, CheckCircle, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { fetchGithubUserData } from '@/actions/getGithubInfo';
import { GithubUserData } from '@/types/github';
import { Intelligence } from '@/types/intelligence';
import { Vibe } from '@/types/prompt';
import { updateViewCount } from '@/actions/updateViewCount';
import axios from 'axios';

enum VerificationStatus {
  VERIFIED = 'Verified',
  UNVERIFIED = 'Unverified',
  CHECKING = 'Checking...',
}

const BioGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [gitUsername, setGitUsername] = useState<string>('');
  const [selectedVibe, setSelectedVibe] = useState<Vibe>(Vibe.PROFESSIONAL);
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
    if (isDisabled || isLoading) return;
    if (prompt.length === 0) {
      alert('Please enter your prompt or hobby.');
      return;
    }
    setIsLoading(true);
    const selectedAI: Intelligence = localStorage.getItem(
      'agent'
    ) as Intelligence;
    try {
      if (selectedAI && githubInfo && prompt && selectedVibe) {
        const res = await axios
          .post(
            '/api/ai/',
            {
              prompt: prompt,
              vibe: selectedVibe,
              gitInfo: githubInfo,
              model: selectedAI,
            },
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((res) => res.data);
        if (res.code === 200) {
          setResponseData(res.message);
          console.log('Response Data: ', res.message);
          if (githubInfo?.user && githubInfo.user.login && selectedAI) {
            await updateViewCount(githubInfo.user.login, selectedAI);
          } else {
            console.log('Error No Github ID found.');
          }
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    } catch (error) {
      alert('Error generating response. Please try again.');
      console.log('Error in generating response: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="bio_generator"
      className="max-w-2xl mx-auto p-6 space-y-8 w-[90vw]"
    >
      {/* Step 1: Github Username Verification */}
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
              <span>1</span>
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

        {/* Step 2: Vibe Selection */}
        <div
          id="tone_selection"
          className={cn('flex items-start space-x-3', {
            'opacity-50': isDisabled,
          })}
        >
          <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <span>2</span>
          </div>
          <div className="flex-grow space-y-2">
            <label className="block text-md font-medium">
              Select your tone.
            </label>
            <Listbox
              value={selectedVibe}
              onChange={setSelectedVibe}
              disabled={isDisabled}
            >
              <div className="relative">
                <ListboxButton className="relative w-full p-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                  <span>{selectedVibe}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                  </span>
                </ListboxButton>
                <ListboxOptions className="absolute w-full py-1 mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none z-10">
                  {Object.values(Vibe).map((vibe) => (
                    <ListboxOption
                      key={vibe}
                      value={vibe}
                      className={({ active }) =>
                        `cursor-pointer select-none relative py-2 px-4 ${
                          active ? 'bg-black text-white' : 'text-gray-900'
                        }`
                      }
                    >
                      {vibe}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>

        {/* Step 3: Custom Prompt */}
        <div
          id="custom_prompt"
          className={cn('flex items-start space-x-3', {
            'opacity-50': isDisabled,
          })}
        >
          <div className="flex-shrink-0 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
            <span>3</span>
          </div>
          <div className="flex-grow space-y-2">
            <label className="block text-md font-medium">
              Drop in your info{' '}
              <span className="text-gray-500">(or your favorite hobby)</span>.
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Amateur Chef, Software Engineer or leave blank"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      {/* Final Submition Button */}

      <button
        id="submit_button"
        onClick={handleSubmitData}
        disabled={isDisabled || isLoading || prompt.length <= 10}
        className={cn(
          'w-full rounded-lg py-4 px-6 font-medium transition-colors',
          isDisabled || isLoading || prompt.length <= 10
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
              'opacity-50': isDisabled || prompt.length <= 10,
            })}
          >
            Generate your bio →
          </span>
        )}
      </button>

      {/* Generated Bio */}
      {responseData && (
        <div className="bg-gray-100 p-6 rounded-lg" id="generated_bio_response">
          <p className="text-lg font-medium">Generated Bio</p>
          <p className="text-gray-600 mt-2">
            <strong>Title : </strong>
            {responseData.split('Title:')[1].split('Description:')[0]}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Description : </strong>
            {responseData.split('Description:')[1].split('Tech Stack:')[0]}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Tech Stack :</strong>{' '}
            {responseData.split('Tech Stack:')[1].split('Github Link:')[0]}
          </p>
          <p className="text-gray-600 mt-2">
            <strong>Github Link :</strong>{' '}
            {responseData.split('Github Link:')[1]}
          </p>
        </div>
      )}
    </div>
  );
};

export default BioGenerator;
