'use client';

import { FullScreenMain } from '@/components';
import { cn } from '@/utils/cn';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { Silkscreen } from 'next/font/google';
import { useState } from 'react';
import { Aquila } from './Aquila';
import { Command } from './Command';
import { Inquisition } from './Inquisition';
import { Message } from './Message';
import { Typewriter } from './Typewriter';
import styles from './styles.module.css';

const silkscreen = Silkscreen({
  subsets: ['latin'],
  weight: ['400'],
});

enum Status {
  VOX_CHANNELS,
  NOOSPHERIC_LINK,
  ASTROPATHIC_SIGNAL,
  SIGNAL_STRENGTH,
  WARP_INTERFERENCE,
  INITIALIZED,
}

export default function Cogitator() {
  const [input, setInput] = useState('');

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/cogitator',
    }),
  });

  const [status, setStatus] = useState<Status>(Status.VOX_CHANNELS);

  const advanceStatus = () => {
    setTimeout(() => {
      setStatus((prev) => prev + 1);
    }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    setInput('');

    await sendMessage({ text: input });
  };

  return (
    <FullScreenMain
      className={cn(
        silkscreen.className,
        'p-16 text-3xl tracking-wider text-white/85 uppercase',
        styles.cogitator,
        styles.crt,
      )}
    >
      <div
        className={cn(
          'relative flex h-full w-full flex-col gap-4 border-4 border-green-600',
        )}
      >
        <div className="flex grow flex-col gap-4 overflow-auto p-8">
          <div className="ml-14 flex flex-col gap-4">
            <div className="text-lg text-green-500">
              <Typewriter onComplete={advanceStatus}>
                ++ Vox Channels Established
              </Typewriter>

              {status > Status.VOX_CHANNELS && (
                <Typewriter onComplete={advanceStatus}>
                  ++ Noospheric Link Initialized
                </Typewriter>
              )}

              {status > Status.NOOSPHERIC_LINK && (
                <Typewriter onComplete={advanceStatus}>
                  ++ Astropathic Link Initialized
                </Typewriter>
              )}

              {status > Status.ASTROPATHIC_SIGNAL && (
                <Typewriter
                  onComplete={advanceStatus}
                  className="text-orange-300/50"
                >
                  :::: Signal Strength: Marginal
                </Typewriter>
              )}

              {status > Status.SIGNAL_STRENGTH && (
                <Typewriter
                  onComplete={advanceStatus}
                  className="text-red-600/50"
                >
                  :::: Warp Interference: Significant
                </Typewriter>
              )}

              {status > Status.WARP_INTERFERENCE && (
                <Typewriter>++ Ready</Typewriter>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <Message key={message.id} data={message} />
              ))}
            </div>
          </div>

          {status >= Status.INITIALIZED && (
            <form
              onSubmit={handleSubmit}
              className="flex w-full items-center gap-4"
            >
              <span className="w-6 text-white">
                <Command fill="currentColor" />
              </span>
              <input
                name="prompt"
                value={input}
                autoFocus
                autoComplete="off"
                onChange={(e) => setInput(e.target.value)}
                className="flex grow px-4 py-2 uppercase outline-0"
              />
            </form>
          )}
        </div>

        <div className="mx-8 flex flex-col">
          <div className="border-orange-300/80p-2 relative flex min-w-0 justify-between gap-4 border-4 p-2 tracking-normal text-orange-300/80">
            <div className="flex">
              <div className="flex w-full flex-col text-sm">
                <div className="max-w-full truncate">Calixis CIR.22.08</div>
                <div className="max-w-full truncate text-yellow-800">
                  61 F NRT/1 POST ADR
                </div>
              </div>
            </div>

            <div className="flex truncate text-sm">
              PRIORITY ALERT: ASTROPATHIC SIGNAL
            </div>

            <div className="flex">
              <div className="flex w-full flex-col text-sm">
                <div className="max-w-full truncate">INQ COGITATOR</div>
                <div className="max-w-full truncate text-yellow-800">
                  O-03/22/776.M41
                </div>
              </div>
            </div>

            <div className="ml-16 flex">
              <div className="flex w-full flex-col truncate text-xs text-yellow-800">
                <div className="max-w-full truncate">Segmentum Obscurus</div>
                <div className="max-w-full truncate">Authority: Ordo Xenos</div>
              </div>
            </div>

            <div className="relative -my-2 h-[calc(100%+1rem)] w-[8px] shrink-0 bg-orange-300/80">
              <div className="absolute top-0 left-0 text-sm text-black select-none">
                M
              </div>
            </div>

            <div className="flex text-sm text-yellow-800 select-none">
              <div className="max-w-full truncate">===</div>
            </div>

            <div className="flex">
              <div className="flex w-full flex-col items-end">
                <div className="text-normal max-w-full truncate">
                  DAT-M12.39
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-green-800">
            REF: TACTICA-PRIME/776.M41
          </div>
        </div>

        <div className="flex justify-between">
          <div className="ml-2 flex w-[calc(50%-64px)] overflow-hidden text-xs text-green-800">
            <div className="flex items-center gap-8 whitespace-nowrap">
              <div>Data-Vault Sigil: 7A-23B9-6C4D-FF12-9983</div>
              <div>Delta-Omn ++ Sanctified</div>
              <div>Mem-Archive OBSCURUS//COHORT</div>
            </div>
          </div>

          <div className="mr-2 flex w-[calc(50%-64px)] overflow-hidden text-xs text-green-800">
            <div className="flex items-center gap-4 whitespace-nowrap">
              <div className="h-2 w-2 rounded-full bg-green-800" />
              <div>Vox-Link Established</div>
              <div className="h-2 w-2 rounded-full bg-green-800" />
              <div>Noospheric Link Active</div>
              <div className="h-2 w-2 rounded-full bg-yellow-800" />
              <div className="text-yellow-800">TRAFFIC: 0041.03.22/M41</div>
              <div>Encryption: Canticle-9</div>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-centertext-green-600 absolute top-4 left-1/2 flex -translate-x-1/2 items-center border-4 border-green-600/15 bg-slate-900 p-1 px-2 text-green-600 outline-8 outline-slate-900">
        <div className="w-36 border-4 border-green-600/15 p-2">
          <Aquila fill="currentColor" />
        </div>
      </div>

      <div className="justify-centertext-green-600 absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center border-4 border-green-600/15 bg-slate-900 p-1 text-green-600 outline-8 outline-slate-900">
        <div className="w-14 border-4 border-green-600/15 p-2">
          <Inquisition fill="currentColor" />
        </div>
      </div>

      <div
        className={cn(
          'pointer-events-none absolute top-0 left-0 h-screen w-screen select-none',
          styles.scanlines,
        )}
      />
      <div className={styles.pixelGrid} />
    </FullScreenMain>
  );
}
