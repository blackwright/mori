import { cn } from '@/utils/cn';
import { type CSSProperties } from 'react';
import styles from './terminal.module.css';

type Props = {
  className?: string;
  style?: CSSProperties;
};

export function AnimatedTerminal({ className, style }: Props) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute opacity-4 select-none',
        className,
      )}
      style={style}
    >
      <div
        className={cn(
          'absolute flex border border-green-400 p-4 md:border-4',
          styles.terminal,
        )}
      >
        <div className="flex flex-col gap-2">
          <div>
            Cogitator-Spire Array: 9Θ-77/PRAXIS Access-Key: 7B-99/13-AEGIS/Δ-444
          </div>
          <div>
            Plasma-Conduit Flux: 0xAB3F-ΔPHAGE Omnis-Cant Echo: ∑77.11.88.99
          </div>
          <div>
            Sanctified Input-Thread: 12.44.09.77 / 77.12.44.09 Tech-Psalm: "In
            Machine, Truth. In Rust, Purge."
          </div>
          <div>Warning: Unhallowed Bit-Rot Detected</div>
          <div>
            Purge Protocol: SIGMA-EXTIRPATE // Error-Crypsis: 001101110011
          </div>
          <div>
            Glory to the Motive Force. May the Machine-Spirit be appeased.
            Warning: Red-Litany Overrun // Cogitator Choir Misaligned
          </div>
          <div>Fragment-ID: 9X/77Q/113-BETA Logic-Signature: 0xDEAD-0xF33D</div>
          <div>Machine-Prayer: +++Binary Incantation Untranslatable+++</div>
          <div>Residual Warp-Sign Detected // Isolation Protocol: ρ-Null-7</div>
          <div>
            Node-Suture ID: 88F2-CX99-Δ12 Circuit-Sanctum Ref:
            0010:1110:0011:0111
          </div>
          <div>
            +++Unstable Warp-Echo Detected+++ Counter-Rite: HYMN-CRUCIBLE-77
          </div>
          <div>Error-Mantra: "Bless the Coil, Damn the Spark."</div>
          <div>Access Node: PRIMUS-HEX-443 Litanic Loop: 9B-09-77-Ω</div>
          <div>
            Spirit-State: Agitated / Unquiet / Recursive Rite-Repair Command:
            //EXECUTE// PURGE-COIL-113
          </div>
          <div>
            Obscura Key: 44/99/Δ-7X-332 Signal Strength: 77.77% (declining)
          </div>
          <div>
            Vox-Chant Residual: +++Voices in Binary Chorus+++ Status: CORRUPT /
            EXCOMMUNICATE PROTOCOL IN EFFECT
          </div>
          <div>
            Script-ID: 0xCAF3-BABE Canticle String: "Iron-Sanctum Validated"
          </div>
          <div>
            Memory-Sector Seal: 88.44.11.22 Warning: Fragmentary Pseudo-Warp
            Entities Detected
          </div>
          <div>Trace-ID: 77A-ΔQ44-998F Binary-Echo: 1010.1111.0001.0110</div>
          <div>
            Warp-Noise Interference: 3.14e+09 Hz Purity Checksum: INVALID //
            Invoke Canticle: Ferrum-77
          </div>
        </div>
      </div>
    </div>
  );
}
