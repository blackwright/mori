'use client';

import { Button, Drawer, FullScreenMain } from '@/components';
import { cn } from '@/utils/cn';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { AnimatePresence } from 'motion/react';
import { Silkscreen } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'react-feather';
import { useDetailsSearchParams } from '../hooks';
import { AnimatedTerminal } from './AnimatedTerminal';
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
  ASTROPATHIC_SIGNAL,
  WARP_INTERFERENCE,
  WARP_MONITORING,
  RESTARTING_PROMPT,
  INITIAL_PROMPT,
  WAITING_FOR_USER,
  STREAMING_ENDING,
  ENDING,
}

export default function Cogitator() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState('');

  const [areDetailsOpen] = useDetailsSearchParams();

  const { messages, sendMessage, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/cogitator',
    }),
  });

  const [status, setStatus] = useState<Status>(Status.VOX_CHANNELS);

  const updateStatus = useCallback((newStatus: Status, ms = 88) => {
    setTimeout(() => {
      setStatus(newStatus);
    }, ms);
  }, []);

  const handleEnding = useCallback((endingState: 'streaming' | 'done') => {
    if (endingState === 'streaming') {
      setStatus(Status.STREAMING_ENDING);
    } else if (endingState === 'done') {
      setStatus(Status.ENDING);
    }
  }, []);

  useEffect(() => {
    if (status === Status.RESTARTING_PROMPT) {
      setStatus(Status.INITIAL_PROMPT);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }

    setInput('');

    await sendMessage({ text: input });
  };

  const handleRestart = () => {
    setMessages([]);
    setStatus(Status.RESTARTING_PROMPT);
  };

  return (
    <FullScreenMain>
      <div
        className={cn(
          silkscreen.className,
          'pt-12 text-xs tracking-wider text-white/85 select-none md:p-16 md:text-sm',
          styles.cogitator,
          styles.crt,
        )}
      >
        <div className="relative flex h-full w-full flex-col gap-4 border-green-600 text-xs md:border-4">
          <AnimatedTerminal
            style={{
              top: '2%',
              left: '2%',
              width: '30vw',
              height: '36vh',
              '--animation-delay': '-1.2s',
            }}
          />

          <AnimatedTerminal
            className="text-right"
            style={{
              top: '5%',
              left: '30%',
              width: '32vw',
              height: '21vh',
              '--animation-delay': '-10.2s',
            }}
          />

          <AnimatedTerminal
            style={{
              top: '35%',
              left: '35%',
              width: '30vw',
              height: '25vh',
              '--animation-delay': '-6.5s',
            }}
          />

          <AnimatedTerminal
            className="text-right"
            style={{
              left: '2%',
              top: '25%',
              width: '21vw',
              height: '28vh',
              '--animation-delay': '-8.9s',
            }}
          />

          <div className="absolute -top-6 left-0 hidden w-full justify-between text-green-800 md:flex">
            <div className="flex w-1/2 overflow-hidden whitespace-nowrap">
              7A-23B9-6C4D-FF12-9983 44F9-A12D-0BB7-77C4-11E8
              9C-7B18-22D1-00AE-4F39 E2-5F66-8D03-92A1-3C7B
              1F-9D44-0E2A-BC31-77F0 6B-11C8-5F90-EE21-89AA
              8A-03F1-998C-4402-CE7D 4C-72A0-11F9-3ED6-5B90
              0E-6BB1-73DA-22F5-1A49 2D-58C2-9E40-AB71-39F8
              7E-9A88-3F12-4480-CC2D
            </div>
            <div className="flex w-1/2 justify-end overflow-hidden whitespace-nowrap">
              3F-0D41-555E-72B9-8440 9A-42C0-07B2-11E3-58A5
              5C-8E77-1B64-9F30-201D A1-4F55-72D9-3B20-8C6E
              D9-83A1-6F40-224C-71B2 F0-92E3-118C-447A-2DD5
              6E-77C0-9B12-5F04-983A B4-0A19-83F2-66C1-19E7
              CE-9B40-00D8-3A57-721F 12-5FA3-7EC1-44B9-0D92
            </div>
          </div>

          <div className="hidden justify-between text-green-800 md:flex">
            <div className="ml-2 flex w-1/2 overflow-hidden text-xs">
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div>Cipher-Key Index: 44F9-A12D-0BB7-77C4-11E8</div>
                <div>Encryption: Hymnal-77</div>
                <div>4C-72A0-11F9-3ED6-5B90</div>
                <div>Noospheric Signal Integrity 99.7%</div>
              </div>
            </div>

            <div className="mr-2 flex w-1/2 justify-end overflow-hidden text-xs">
              <div className="flex items-center gap-4 whitespace-nowrap">
                <div>Vox-Link Established</div>
                <div>9C-7B18-22D1-00AE-4F39</div>
                <div>Mem-Archive STELLARIS//PRAXIS</div>
                <div>2083.44.11 // S01</div>
                <div>Vox-Relay Channel Maintained</div>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 grow flex-col gap-4 p-4 md:p-8">
            <div className="flex min-h-0 flex-col gap-4 overflow-auto md:ml-14">
              <div className="text-sm text-green-500 md:text-lg">
                <Typewriter
                  stagger={0.005}
                  onComplete={() => updateStatus(Status.ASTROPATHIC_SIGNAL)}
                >
                  ++ Vox Channels Established ++
                </Typewriter>

                {status >= Status.ASTROPATHIC_SIGNAL && (
                  <Typewriter
                    stagger={0.005}
                    onComplete={() =>
                      updateStatus(Status.WARP_INTERFERENCE, 200)
                    }
                  >
                    ++ Astropathic Link Initialized ++
                  </Typewriter>
                )}

                {status >= Status.WARP_INTERFERENCE && (
                  <Typewriter
                    onComplete={() => updateStatus(Status.WARP_MONITORING)}
                    className="text-red-600/50"
                  >
                    -- Warp Interference Detected --
                  </Typewriter>
                )}

                {status >= Status.WARP_MONITORING && (
                  <Typewriter
                    onComplete={() => updateStatus(Status.INITIAL_PROMPT, 200)}
                    className="text-red-600/50"
                  >
                    ::: Monitoring Data Exchange for Warp Contamination :::
                  </Typewriter>
                )}
              </div>

              <div
                ref={scrollContainerRef}
                className="flex flex-col gap-4 text-lg text-green-400"
              >
                {status >= Status.INITIAL_PROMPT && (
                  <Typewriter
                    stagger={0.005}
                    onComplete={() => updateStatus(Status.WAITING_FOR_USER)}
                    className="font-mono"
                  >
                    Awaiting Query...
                  </Typewriter>
                )}

                {messages.map((message) => (
                  <Message
                    key={message.id}
                    data={message}
                    onEnd={handleEnding}
                  />
                ))}
              </div>
            </div>

            {status >= Status.WAITING_FOR_USER && (
              <form
                onSubmit={handleSubmit}
                className="flex w-full shrink-0 items-center gap-4 border-2 border-white/25 bg-green-950 p-2 focus-within:outline-1 focus-within:outline-white/75"
              >
                <span className="w-8 shrink-0 text-white">
                  {status >= Status.STREAMING_ENDING ? (
                    <Button
                      type="button"
                      onClick={handleRestart}
                      className="flex self-center bg-white/25 p-1"
                    >
                      <RotateCcw />
                    </Button>
                  ) : (
                    <Command fill="currentColor" />
                  )}
                </span>

                <input
                  ref={inputRef}
                  name="prompt"
                  value={input}
                  autoFocus
                  autoComplete="off"
                  onChange={(e) => setInput(e.target.value)}
                  className="z-10 flex min-w-0 grow text-lg uppercase outline-0 md:text-2xl"
                />
              </form>
            )}
          </div>

          <div className="mx-8 flex flex-col overflow-hidden opacity-75 select-none">
            <div className="border-orange-300/80p-2 relative flex min-w-0 justify-between gap-4 border-4 p-2 tracking-normal text-orange-300/80">
              <div className="flex">
                <div className="flex w-full flex-col">
                  <div className="max-w-full truncate">Calixis CIR.22.08</div>
                  <div className="max-w-full truncate text-yellow-800">
                    61 F NRT/1 POST ADR
                  </div>
                </div>
              </div>

              <div className="hidden truncate xl:flex">
                PRIORITY ALERT: ASTROPATHIC SIGNAL
              </div>

              <div className="hidden md:flex">
                <div className="flex w-full flex-col">
                  <div className="max-w-full truncate">INQ COGITATOR</div>
                  <div className="max-w-full truncate text-yellow-800">
                    O-03/22/776.M41
                  </div>
                </div>
              </div>

              <div className="ml-16 hidden xl:flex">
                <div className="flex w-full flex-col truncate text-xs text-yellow-800">
                  <div className="max-w-full truncate">Segmentum Obscurus</div>
                  <div className="max-w-full truncate">
                    Authority: Ordo Xenos
                  </div>
                </div>
              </div>

              <div className="relative -my-2 w-[8px] shrink-0 bg-orange-300/80">
                <div className="absolute top-0 left-0 text-sm text-black select-none">
                  M
                </div>
              </div>

              <div className="hidden text-yellow-800 md:flex">
                <div className="max-w-full truncate">===</div>
              </div>

              <div className="hidden sm:flex">
                <div className="flex w-full flex-col items-end">
                  <div className="max-w-full truncate sm:text-base xl:text-3xl">
                    DAT-M12.39
                  </div>
                </div>
              </div>
            </div>
            <div className="text-xs text-green-800">
              REF: TACTICA-PRIME/776.M41
            </div>
          </div>

          <div className="flex justify-between select-none">
            <div className="ml-2 flex w-1/2 overflow-hidden text-xs text-green-800">
              <div className="flex items-center gap-8 whitespace-nowrap">
                <div>Data-Vault Sigil: 7A-23B9-6C4D-FF12-9983</div>
                <div>Delta-Omn ++ Sanctified</div>
                <div>Mem-Archive OBSCURUS//COHORT</div>
                <div>0169.45.92/M41</div>
                <div>VENTUS//ORDO 3F12-4480</div>
              </div>
            </div>

            <div className="mr-2 flex w-1/2 justify-end overflow-hidden text-xs text-green-800">
              <div className="flex items-center gap-4 whitespace-nowrap">
                <div className="h-2 w-2 rounded-full bg-green-800" />
                <div>Vox-Link Established</div>
                <div>5C-8E77-1B64-9F30-201D</div>
                <div className="h-2 w-2 rounded-full bg-green-800" />
                <div>Noospheric Link Active</div>
                <div className="h-2 w-2 rounded-full bg-yellow-800" />
                <div className="text-yellow-800">TRAFFIC: 0041.03.22/M41</div>
                <div>Encryption: Canticle-9</div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 left-0 hidden w-full justify-between text-xs text-green-800 md:flex">
            <div className="flex w-1/2 overflow-hidden whitespace-nowrap">
              4821.07.33 1904.55.09 7340.88.62 5062.13.47 8239.01.25 6721.42.11
              9183.76.54 2405.90.38 3598.22.77 4810.66.05 7254.31.92 1390.48.60
              8675.99.14 4021.07.83 5543.23.41 6809.12.57 7932.81.06 2150.44.29
              9314.75.08 3772.18.95
            </div>

            <div className="flex w-1/2 justify-end overflow-hidden whitespace-nowrap">
              1047.23.58 9821.40.16 5630.77.91 4185.12.04 7309.66.28 2914.09.73
              8752.31.60 6048.55.17 1376.82.49 4590.18.35 3281.44.02 7615.97.80
              5923.21.64 4807.30.19 8142.56.87 2098.73.41 6350.05.92 9471.28.33
              3726.11.70 5814.68.25
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-1/2 hidden -translate-x-1/2 items-center justify-center border-4 border-green-600/15 bg-slate-900 p-1 px-2 text-green-600 outline-8 outline-slate-900 md:flex">
          <div className="w-36 border-4 border-green-600/15 p-2">
            <Aquila fill="currentColor" />
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 hidden -translate-x-1/2 items-center justify-center border-4 border-green-600/15 bg-slate-900 p-1 text-green-600 outline-8 outline-slate-900 md:flex">
          <div className="w-14 border-4 border-green-600/15 p-2">
            <Inquisition fill="currentColor" />
          </div>
        </div>

        <div
          className={cn(
            'pointer-events-none absolute top-0 left-0 z-20 h-screen w-screen select-none',
            styles.scanlines,
          )}
        />
      </div>

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>
              A Chat GPT-style terminal interface that emulates an
              &quot;imperial cogitator&quot; from Warhammer 40K.
            </p>
            <p>Ask it about itself, the setting, or lore about the universe.</p>
            <p>
              Be warned — you&apos;re on a ship that was supposed to have been
              lost centuries ago. Nudging this cogitator toward heresy may
              result in non-standard behavior.
            </p>
            <p>
              For example, you might upset it if you wrote something borderline
              heretical like &quot;Xenos aren&apos;t so bad.&quot; To really
              rile it up, you could type something outright blasphemous, like
              &quot;The emperor is a rotting corpse,&quot; although that would
              be crazy-talk because everyone knows he&apos;s the one true golden
              god.
            </p>
            <p>
              Uses gpt-4o with a prompt that provides backstory and restricts
              output to be lore-friendly. The model classifies messages based on
              the user&apos;s (non-)adherence to imperial doctrine as a level
              between 0 and 9, returning each message with a control character
              at the beginning of the response so that the UI can apply styles
              while streaming.
            </p>
          </Drawer>
        )}
      </AnimatePresence>
    </FullScreenMain>
  );
}
