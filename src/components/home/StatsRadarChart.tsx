
import { Stat } from "@/context/AppContext";
import { useEffect, useRef } from "react";

interface StatsRadarChartProps {
  stats: Record<string, Stat>;
}

export default function StatsRadarChart({ stats }: StatsRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2.5;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw background
    ctx.fillStyle = 'rgba(26, 31, 44, 0.7)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.fill();
    
    // Draw grid lines
    const gridLevels = 5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    
    for (let i = 1; i <= gridLevels; i++) {
      const gridRadius = (radius / gridLevels) * i;
      ctx.beginPath();
      ctx.arc(centerX, centerY, gridRadius, 0, 2 * Math.PI);
      ctx.stroke();
    }
    
    // Draw axis lines
    const statKeys = Object.keys(stats);
    const angleStep = (2 * Math.PI) / statKeys.length;
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < statKeys.length; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top (- Math.PI/2)
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + radius * Math.cos(angle),
        centerY + radius * Math.sin(angle)
      );
      ctx.stroke();
      
      // Add stat labels
      const label = stats[statKeys[i]].displayName;
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(label, labelX, labelY);
    }
    
    // Plot stat values
    ctx.fillStyle = 'rgba(155, 135, 245, 0.6)';
    ctx.strokeStyle = 'rgba(155, 135, 245, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    const maxStatValue = 10; // Base for percentage calculation
    
    for (let i = 0; i < statKeys.length; i++) {
      const statKey = statKeys[i];
      const statValue = Math.min(stats[statKey].value, maxStatValue);
      const percentage = statValue / maxStatValue;
      const angle = i * angleStep - Math.PI / 2; // Start from top
      
      const x = centerX + radius * percentage * Math.cos(angle);
      const y = centerY + radius * percentage * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    // Connect back to first point
    const firstStatKey = statKeys[0];
    const firstStatValue = Math.min(stats[firstStatKey].value, maxStatValue);
    const firstPercentage = firstStatValue / maxStatValue;
    const firstAngle = -Math.PI / 2; // Start from top
    ctx.lineTo(
      centerX + radius * firstPercentage * Math.cos(firstAngle),
      centerY + radius * firstPercentage * Math.sin(firstAngle)
    );
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Plot stat points
    ctx.fillStyle = 'white';
    for (let i = 0; i < statKeys.length; i++) {
      const statKey = statKeys[i];
      const statValue = Math.min(stats[statKey].value, maxStatValue);
      const percentage = statValue / maxStatValue;
      const angle = i * angleStep - Math.PI / 2;
      
      const x = centerX + radius * percentage * Math.cos(angle);
      const y = centerY + radius * percentage * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    
  }, [stats]);

  return (
    <div className="bg-solo-purple-dark/50 rounded-lg p-4 border border-solo-purple-secondary/20">
      <h3 className="text-lg font-semibold mb-2 text-center">Hunter Stats</h3>
      <div className="flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300}
          className="max-w-full"
        />
      </div>
    </div>
  );
}
