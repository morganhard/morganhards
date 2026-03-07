import { create } from 'zustand';

interface AppState {
    activeAgent: string | null;
    infrastructureStatus: 'Optimized' | 'Provisioning' | 'Degraded';
    setActiveAgent: (agent: string | null) => void;
    setInfrastructureStatus: (status: 'Optimized' | 'Provisioning' | 'Degraded') => void;
}

export const useAppStore = create<AppState>((set) => ({
    activeAgent: null,
    infrastructureStatus: 'Optimized',
    setActiveAgent: (activeAgent) => set({ activeAgent }),
    setInfrastructureStatus: (infrastructureStatus) => set({ infrastructureStatus }),
}));
